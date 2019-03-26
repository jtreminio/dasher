import * as React from "react";
import {
    Card,
    Classes,
    Elevation,
    H2,
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
    <section>
        <H2>FPM Conf</H2>

        <p className={Classes.TEXT_MUTED}>
            <a href={link1} target="_blank">Click here for all default values.</a>
        </p>

        <Card elevation={Elevation.TWO}>
            <MultiSelectInput
                data={ini.fpm.data}
                nameFormat={nameFormat}
                onSelect={props.form.fpm.onChange}
                selected={props.form.fpm.value}
            />
        </Card>
    </section>
);

export default IniFpm;
