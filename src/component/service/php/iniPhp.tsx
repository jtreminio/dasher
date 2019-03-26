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

const nameFormat = (name: string) => name.replace("PHP.", "");
const link1 = "https://github.com/jtreminio/php-docker/blob/master/Dockerfile-env#L3-L595";
const link2 = "https://jtreminio.com/blog/docker-php/php-fpm-configuration-via-environment-variables/";

const IniPhp = observer<Props>(props =>
    <section>
        <H2>PHP INI</H2>

        <p className={Classes.TEXT_MUTED}>
            INI settings are set using environment variables. For more information
            you can read my blog
            post, <a href={link2} target="_blank">
                Docker PHP/PHP-FPM Configuration via Environment Variables</a>.
        </p>

        <p className={Classes.TEXT_MUTED}>
            <a href={link1} target="_blank">Click here for all default values.</a>
        </p>

        <Card elevation={Elevation.TWO}>
            <MultiSelectInput
                data={ini.php.data}
                nameFormat={nameFormat}
                onSelect={props.form.php.onChange}
                selected={props.form.php.value}
            />
        </Card>
    </section>
);

export default IniPhp;
