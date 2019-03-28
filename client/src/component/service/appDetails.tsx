import * as React from "react";
import {
    Card,
    Code,
    ControlGroup,
    Elevation,
    FormGroup,
    H2,
    InputGroup,
    Intent,
} from "@blueprintjs/core";
import {
    observer,
} from "mobx-react-lite";

import {
    ServiceAppFormI,
} from "@app/types";
import ErrorIcon from "@app/component/formErrorIcon";

type Props = {
    children?: React.ReactNode,
    form: ServiceAppFormI,
};

const AppDetails = observer<Props>(props => {
    const onChangeName = (e: React.SyntheticEvent<HTMLInputElement>) => {
        props.form.name.onChange(e.currentTarget.value.replace(/\W/g, ""));
    };

    const onChangeAppRoot = (e: React.SyntheticEvent<HTMLInputElement>) =>
        props.form.appRoot.onChange(e.currentTarget.value);

    return (
        <section>
            <H2>Service Details</H2>

            {props.children}

            <Card elevation={Elevation.TWO}>
                <div className="row">
                    <Name form={props.form} onChange={onChangeName} />

                    <AppRoot form={props.form} onChange={onChangeAppRoot} />
                </div>
            </Card>
        </section>
    );
});

type FieldProps = {
    form: ServiceAppFormI,
    onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void,
}

const Name = observer<FieldProps>(props => {
    const error = props.form.name.error || props.form.nameInUse.error;

    return (
        <FormGroup
            className="col-6"
            intent={error ? Intent.DANGER : undefined}
            label="Service Name"
            labelFor="name"
        >
            <ControlGroup fill>
                <InputGroup
                    id="name"
                    intent={error ? Intent.DANGER : undefined}
                    onChange={props.onChange}
                    placeholder="Service Name"
                    value={props.form.name.value}
                />

                <ErrorIcon hasError={!!error} />
            </ControlGroup>

            <div className="helper-text">{error && `> ${error}`}</div>

            <p className="helper-text">
                Must be unique to each Project. You can leave it as default.
            </p>
        </FormGroup>
    );
});

const AppRoot = observer<FieldProps>(props =>
    <FormGroup
        className="col-6"
        label="Path to App Root"
        labelFor="appRoot"
        intent={props.form.appRoot.error ? Intent.DANGER : undefined}
    >
        <ControlGroup fill>
            <InputGroup
                id="appRoot"
                placeholder="Path to App Root"
                intent={props.form.appRoot.error ? Intent.DANGER : undefined}
                value={props.form.appRoot.value}
                onChange={props.onChange}
            />

            <ErrorIcon hasError={!!props.form.appRoot.error} />
        </ControlGroup>

        <div className="helper-text">
            {props.form.appRoot.error && `> ${props.form.appRoot.error}`}
        </div>

        <p className="helper-text">
            Location of your project files on host machine.
            The contents will be made available inside the container
            at <Code>/var/www</Code>.
        </p>
    </FormGroup>
);

export default AppDetails;
