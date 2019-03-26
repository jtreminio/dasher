import * as React from "react";
import {
    Classes,
    FormGroup,
    H3,
    Tag,
} from "@blueprintjs/core";
import {
    observer,
} from "mobx-react-lite";

import {
    ModuleI,
} from "@app/data/php";
import MultiSelectTag from "@app/component/multiSelectTag";
import Form           from "@app/form/service/phpForm";

type Props = {
    form: Form,
    allModules: ModuleI,
};

const ModulePhp = observer<Props>(props =>
    <div className="helper-form">
        <div className="left">
            <H3>Enabled Modules</H3>

            <div className={Classes.TEXT_MUTED}>
                <p>
                    PHP comes with several modules enabled by default. You can
                    also enable more modules and they will be made available to
                    both FPM and CLI.
                </p>

                <p>
                    For more information you can read my blog post,&nbsp;
                    <a href="https://jtreminio.com/blog/php-modules-toggled-via-environment-variables/">
                        PHP Modules Toggled via Environment Variables</a>
                </p>
            </div>
        </div>

        <div className="right">
            <FormGroup
                inline
                label="Default Modules"
            >
                {props.allModules.default.map(module =>
                    <Tag key={module} minimal className="mr-1 mb-1">{module}</Tag>
                )}

                <p className="mt-2">
                    These modules are enabled by default and always available.
                </p>
            </FormGroup>

            <FormGroup
                inline
                label="Optional Modules"
            >
                <MultiSelectTag
                    data={props.allModules.data}
                    onSelect={props.form.modules.onChange}
                    selected={props.form.modules.value}
                />

                <p className="mt-2">
                    You can enable any number of optional modules from this list.
                </p>
            </FormGroup>
        </div>
    </div>
);

export default ModulePhp;
