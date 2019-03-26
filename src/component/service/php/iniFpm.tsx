import * as React from "react";
import {
    Classes,
    H3,
} from "@blueprintjs/core";
import {
    observer,
} from "mobx-react-lite";

import {
    ini,
} from "@app/data/php";
import MultiSelectInput from "@app/component/multiSelectInput";
import Form             from "@app/form/service/phpForm";

type Props = {
    form: Form,
};

const nameFormat = (name: string) => name.replace("FPM.", "");

const IniFpm = observer<Props>(props =>
    <div className="helper-form">
        <div className="left">
            <H3>FPM Conf</H3>

            <div className={Classes.TEXT_MUTED}>
                <p><a href="https://github.com/jtreminio/php-docker/blob/master/Dockerfile-env#L663-L675"
                      target="_blank">Click here for all default values.</a></p>
            </div>
        </div>

        <div className="right">
            <MultiSelectInput
                data={ini.fpm.data}
                nameFormat={nameFormat}
                selected={props.form.fpm.value}
                onSelect={props.form.fpm.onChange}
            />
        </div>
    </div>
);

export default IniFpm;
