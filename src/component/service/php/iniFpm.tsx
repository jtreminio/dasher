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
const link1 = "https://github.com/jtreminio/php-docker/blob/master/Dockerfile-env#L663-L675";

const IniFpm = observer<Props>(props =>
    <div className="d-flex flex-column">
        <div>
            <H3>FPM Conf</H3>

            <div className={`${Classes.TEXT_MUTED} ml-3`}>
                <p>
                    <a href={link1}
                       target="_blank">Click here for all default values.</a>
                </p>
            </div>
        </div>

        <div className="mt-3 px-2">
            <MultiSelectInput
                data={ini.fpm.data}
                nameFormat={nameFormat}
                onSelect={props.form.fpm.onChange}
                selected={props.form.fpm.value}
            />
        </div>
    </div>
);

export default IniFpm;
