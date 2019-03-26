import * as React from "react";
import {
    Card,
    Classes,
    Elevation,
    FormGroup,
    H2,
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

const link1 = "https://jtreminio.com/blog/php-modules-toggled-via-environment-variables/";

const ModulePhp = observer<Props>(props =>
    <section>
        <H2>Enabled Modules</H2>

        <p className={Classes.TEXT_MUTED}>
            PHP comes with several modules enabled by default. You can
            also enable more modules and they will be made available to
            both FPM and CLI. For more information you can read my blog
            post, <a href={link1} target="_blank">
                PHP Modules Toggled via Environment Variables</a>.
        </p>

        <Card elevation={Elevation.TWO}>
            <div className="row">
                <div className="col-6">
                    <FormGroup
                        helperText="These modules are enabled by default and always available."
                        label="Default Modules"
                    >
                        {props.allModules.default.map(module =>
                            <Tag key={module} minimal className="mr-1 mb-1">{module}</Tag>
                        )}
                    </FormGroup>
                </div>

                <div className="col-6">
                    <FormGroup
                        helperText="You can enable any number of optional modules from this list."
                        label="Optional Modules"
                    >
                        <MultiSelectTag
                            data={props.allModules.data}
                            onSelect={props.form.modules.onChange}
                            selected={props.form.modules.value}
                        />
                    </FormGroup>
                </div>
            </div>
        </Card>
    </section>
);

export default ModulePhp;
