import * as React from "react";
import {
    Card,
    ControlGroup,
    Elevation,
    FormGroup,
    H2,
    InputGroup,
    Intent,
    Tag,
} from "@blueprintjs/core";
import {
    observer,
} from "mobx-react-lite";

import {
    ServiceAppVhostFormI,
    VhostConfig,
} from "@app/types";
import ApacheMode     from "@app/data/apache-codemirror.js";
import ErrorIcon      from "@app/component/formErrorIcon";
import SelectEditable from "@app/component/selectEditable";

type Props = {
    /** Used as left-side details */
    children?: React.ReactNode,
    form: ServiceAppVhostFormI,
    allVhosts: VhostConfig[],
};

const ApacheAppVhost = observer<Props>(props => {
    const vhostOnChange = (e: React.SyntheticEvent<HTMLInputElement>) =>
        props.form.vhost.onChange(e.currentTarget.value);

    const dataOnChange = (data: string) => dataUpdate(data);

    const dataUpdate = (data: string) => props.form.vhostData.onChange(data);

    const selectedUpdate = (type: string, data?: string) => {
        const selected = props.allVhosts.find(v => v.type === type) as VhostConfig;

        props.form.vhostType.onChange(selected.type);
        dataUpdate(data || selected.data);
    };

    return (
        <section>
            <H2>Apache Virtual Host Config</H2>

            {props.children}

            <Card elevation={Elevation.TWO}>
                <div className="row">
                    <Vhost form={props.form} onChange={vhostOnChange} />

                    <SelectEditable
                        allRecords={props.allVhosts}
                        dataOnChange={dataOnChange}
                        editButtonTarget="custom"
                        editorDefineMode={{name: "apache", fn: ApacheMode}}
                        editorProps={{
                            lineNumbers: true,
                            mode: "apache",
                            theme: "material",
                        }}
                        formGroupProps={{
                            label: "Select App Type",
                            labelFor: "vhostType",
                        }}
                        selected={props.form.vhostType.value}
                        selectOnChange={selectedUpdate}
                        validationError={props.form.vhostType.error}
                    />
                </div>
            </Card>
        </section>
    );
});

type FieldProps = {
    form: ServiceAppVhostFormI,
    onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void,
}
const Vhost = observer<FieldProps>(props =>
    <FormGroup
        className="col-6"
        intent={props.form.vhost.error ? Intent.DANGER : undefined}
        label="Server Hostname"
        labelFor="vhost"
    >
        <ControlGroup fill>
            <InputGroup
                id="vhost"
                intent={props.form.vhost.error ? Intent.DANGER : undefined}
                onChange={props.onChange}
                placeholder="awesome.localhost"
                value={props.form.vhost.value}
            />

            <ErrorIcon hasError={!!props.form.vhost.error} />
        </ControlGroup>

        <div className="helper-text">
            {props.form.vhost.error && `> ${props.form.vhost.error}`}
        </div>

        <p className="helper-text">
            You will be able to access your app by going to&nbsp;
            {<Tag minimal>http://{props.form.vhost.value || "<blank>"}</Tag>}
        </p>
    </FormGroup>,
);

export default ApacheAppVhost;
