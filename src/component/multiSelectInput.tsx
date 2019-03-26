import * as React from "react";
import {
    Button,
    HTMLSelect,
    HTMLTable,
    InputGroup,
    Intent,
    Label,
    NonIdealState,
} from "@blueprintjs/core";
import {
    IconNames,
} from "@blueprintjs/icons";
import {
    observer,
} from "mobx-react-lite";
import cuid from "cuid";
import _ from "lodash";

import {
    ObjString_ObjString,
    ObjString_String,
} from "@app/types";

type Props = {
    data: ObjString_ObjString,
    selected: ObjString_String,
    onSelect: (s: ObjString_String) => void,
    nameFormat?: (name: string) => string,
}

const MultiSelectInput = observer<Props>(props => {
    const nameFormatter = props.nameFormat
        ? props.nameFormat
        : (name: string) => name;

    const [flatKeys] = React.useState(() =>
        _.flatten(_.values(props.data).map(k => _.keys(k)))
    );

    const [formattedNames] = React.useState(() =>
        _.zipObject(flatKeys, flatKeys.map(k => nameFormatter(k)))
    );

    const [current, setCurrent] = React.useState(flatKeys[0]);
    const [allCount] = React.useState(flatKeys.length);
    const [uuid] = React.useState(cuid());

    const changeCurrent = (e: React.SyntheticEvent<HTMLSelectElement>) => {
        setCurrent(e.currentTarget.value);
    };

    const changeSelectedValue = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const name = e.currentTarget.dataset.name as string;
        const value = e.currentTarget.value;

        const selected = {
            ...props.selected,
            [name]: value,
        };

        props.onSelect(selected);
    };

    const addSelected = () => {
        let working = current;
        let currentValue = "";

        for (const g of Object.keys(props.data)) {
            if (currentValue !== "") {
                continue;
            }

            if (props.data[g].hasOwnProperty(working)) {
                currentValue = props.data[g][working];
            }
        }

        const selected = {
            ...props.selected,
            [working]: currentValue,
        };

        for (const i of flatKeys) {
            if (i === "") {
                continue;
            }

            if (!selected.hasOwnProperty(i)) {
                working = i;

                break;
            }
        }

        setCurrent(working);

        props.onSelect(selected);
    };

    const deleteSelected = (e: React.SyntheticEvent<HTMLElement>) => {
        let working = current;

        const selected = Object.keys(props.selected).reduce((object, key) => {
            if (key !== e.currentTarget.dataset.name) {
                object[key] = props.selected[key]
            }

            return object;
        }, {});

        if (working.trim() === "") {
            for (const i of flatKeys) {
                if (i === "") {
                    continue;
                }

                if (!selected.hasOwnProperty(i)) {
                    working = i;

                    break;
                }
            }
        }

        setCurrent(working);

        props.onSelect(selected);
    };

    const printAvailableSelectOptions = () => Object.keys(props.data).map(g => {
        const items = _.keys(props.data[g])
            .filter(name => !props.selected.hasOwnProperty(name))
            .map(name => <option key={name} value={name}>{formattedNames[name]}</option>)
        ;

        if (g.length > 0 && items.length) {
            return (
                <optgroup key={g} label={g}>
                    {items}
                </optgroup>
            );
        }

        return items;
    });

    const showFooter = allCount === Object.keys(props.selected).length
        ? "invisible"
        : "";

    const eTitle = "No settings selected";
    const eDesc = "Add custom settings below, or leave blank to use default values.";

    return (
        <>
            <div className="table-scroll">
                <HTMLTable condensed className="w-100">
                    <thead>
                    <tr>
                        <th className="w-40">Name</th>
                        <th className="w-60">Value</th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(props.selected).map(name =>
                        <tr key={name}>
                            <td className="align-middle">
                                <Label htmlFor={name}>{formattedNames[name]}</Label>
                            </td>
                            <td>
                                <InputGroup
                                    placeholder="Value"
                                    defaultValue={props.selected[name]}
                                    onBlur={changeSelectedValue}
                                    id={name}
                                    data-name={name}
                                />
                            </td>
                            <td>
                                <Button
                                    icon={IconNames.MINUS}
                                    intent={Intent.DANGER} minimal
                                    onClick={deleteSelected}
                                    data-name={name}
                                />
                            </td>
                        </tr>,
                    )}
                    {!Object.keys(props.selected).length &&
                    <tr>
                        <td colSpan={3}>
                            <NonIdealState
                                icon={undefined}
                                title={eTitle}
                                description={eDesc}
                                action={undefined}
                            />
                        </td>
                    </tr>
                    }
                    </tbody>
                </HTMLTable>
            </div>
            <HTMLTable condensed className={`w-100 mt-2 ${showFooter}`}>
                <tbody>
                <tr>
                    <td className="w-40 align-middle">
                        <Label className="mb-0" htmlFor={uuid}>Add Another Setting</Label>
                    </td>
                    <td className="w-60">
                        <HTMLSelect
                            id={uuid} fill
                            value={current}
                            onChange={changeCurrent}
                        >
                            {printAvailableSelectOptions()}
                        </HTMLSelect>
                    </td>
                    <td>
                        <Button
                            minimal
                            icon={IconNames.PLUS}
                            intent={Intent.SUCCESS}
                            onClick={addSelected}
                        />
                    </td>
                </tr>
                </tbody>
            </HTMLTable>
        </>
    )
});

export default MultiSelectInput;
