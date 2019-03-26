import "codemirror/lib/codemirror.css";
import * as React from "react";
import {
    Button,
    Card,
    ControlGroup,
    FormGroup,
    HTMLSelect,
    Icon,
    IFormGroupProps,
    Intent,
} from "@blueprintjs/core";
import {
    IconNames,
} from "@blueprintjs/icons";
import {
    EditorConfiguration,
    EditorChange,
} from "codemirror";
import {
    observer,
} from "mobx-react-lite";
import {
    Controlled as CodeMirror,
    IDefineModeOptions,
    IInstance,
} from "react-codemirror2";

import ErrorIcon from "@app/component/formErrorIcon";

type EntityObj = {
    type: string,
    name: string,
    description: string,
    readOnly: boolean,
    data: string,
}

type Props = {
    /** Default selected type */
    selected: string,
    allRecords: EntityObj[],
    /**
     * Non-editable records may have an "edit me" button in top-right corner.
     * If clicked, current non-editable record's data is copied to this target
     * record for live-editing.
     */
    editButtonTarget?: string,
    formGroupProps: IFormGroupProps,
    editorDefineMode?: IDefineModeOptions,
    editorProps: EditorConfiguration,
    selectOnChange: (type: string) => void,
    dataOnChange: (data: string) => void,
    /**
     * Validator for <HTMLSelect> element
     */
    validationError: string | undefined,
}

const SelectEditable = observer<Props>(props => {
    require(`codemirror/theme/${props.editorProps.theme}.css`);

    const [allRecords, setAllRecords] = React.useState(props.allRecords);

    const [current, setCurrent] = React.useState(
        allRecords.find(r => r.type === props.selected) as EntityObj,
    );

    const selectOnChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
        /**
         * Replace current type's data within allRecords
         */
        setAllRecords(prevState => {
            const newState = prevState;

            const currentInAllRecords = newState.find(record =>
                record.type === current.type,
            ) as EntityObj;

            newState[allRecords.indexOf(currentInAllRecords)].data = current.data;

            return newState;
        });

        const type = e.currentTarget.value;

        props.selectOnChange(type);

        setCurrent(allRecords.find(r => r.type === type) as EntityObj);
    };

    const dataOnChange = (data: string) => {
        props.dataOnChange(data);

        setCurrent(prevState => {
            return {...prevState, ...{data}};
        });
    };

    const editButtonOnClick = () => {
        if (!props.editButtonTarget) {
            return;
        }

        const currentData = current.data;
        const type = props.editButtonTarget;

        props.selectOnChange(type);

        const newType = allRecords.find(r => r.type === type) as EntityObj;

        setCurrent(prevState => {
            return {
                ...newType, ...{
                    data: currentData,
                },
            };
        });

        setAllRecords(prevState => {
            const newState = prevState;
            newState[allRecords.indexOf(newType)].data = currentData;

            return newState;
        });
    };

    return (<>
        <div className="col-6">
            <Dropdown
                allRecords={allRecords}
                current={current}
                formGroupProps={props.formGroupProps}
                selectOnChange={selectOnChange}
                validationError={props.validationError}
            />
        </div>

        <div className="col-12">
            <Coder
                contents={current}
                dataOnChange={dataOnChange}
                editButtonOnClick={editButtonOnClick}
                editButtonTarget={props.editButtonTarget}
                editorDefineMode={props.editorDefineMode}
                editorProps={props.editorProps}
            />
        </div>
    </>);
});

type DropdownProps = {
    allRecords: EntityObj[],
    current: EntityObj,
    formGroupProps: IFormGroupProps,
    selectOnChange: (e: React.SyntheticEvent) => void,
    validationError: string | undefined,
}

const Dropdown = observer<DropdownProps>(props =>
    <FormGroup
        {...props.formGroupProps}
        intent={props.validationError ? Intent.DANGER : undefined}
    >
        <ControlGroup fill>
            <HTMLSelect
                fill
                onChange={props.selectOnChange}
                value={props.current.type}
            >
                {props.allRecords.map(rec =>
                    <option key={rec.type} value={rec.type}>
                        {rec.name}
                    </option>,
                )}
            </HTMLSelect>

            <ErrorIcon hasError={!!props.validationError} />
        </ControlGroup>

        <div className="helper-text">
            {props.validationError && `> ${props.validationError}`}
        </div>

        <p className="helper-text">{props.current.description}</p>
    </FormGroup>
);

type CoderProps = {
    contents: EntityObj,
    dataOnChange: (data: string) => void,
    editButtonOnClick: () => void,
    editButtonTarget?: string,
    editorDefineMode?: IDefineModeOptions,
    editorProps: EditorConfiguration,
}

const Coder = observer<CoderProps>(props => {
    const codeMirrorOptions = {...props.editorProps, readOnly: props.contents.readOnly};
    const onBeforeChange = (
        editor: IInstance,
        data: EditorChange,
        value: string
    ) => props.dataOnChange(value);

    return (
        <div className="CodeMirror-container">
            <CodeMirror
                defineMode={props.editorDefineMode}
                onBeforeChange={onBeforeChange}
                options={codeMirrorOptions}
                value={props.contents.data}
            />

            {props.contents.readOnly && props.editButtonTarget &&
                <div className="corner-text">
                    <Button
                        icon={IconNames.EDIT}
                        intent={Intent.PRIMARY}
                        onClick={props.editButtonOnClick}
                    >Customize Me</Button>
                </div>
            }

            {props.editButtonTarget && props.contents.type === props.editButtonTarget &&
                <div className="corner-text">
                    <Card interactive={false} className="custom">
                        <Icon icon={IconNames.BUILD} /> Custom Config
                    </Card>
                </div>
            }
        </div>
    );
});

export default SelectEditable;
