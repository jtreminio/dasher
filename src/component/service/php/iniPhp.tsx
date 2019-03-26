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

const nameFormat = (name: string) => name.replace("PHP.", "");

const IniPhp = observer<Props>(props =>
    <div className="helper-form">
        <div className="left">
            <H3>PHP INI</H3>

            <div className={Classes.TEXT_MUTED}>
                <p><a href="https://github.com/jtreminio/php-docker/blob/master/Dockerfile-env#L3-L595"
                      target="_blank">Click here for all default values.</a></p>

                <p>
                    INI settings are set using environment variables. For more information
                    you can read my blog
                    post, <a
                    href="https://jtreminio.com/blog/docker-php/php-fpm-configuration-via-environment-variables/"
                    target="_blank">Docker PHP/PHP-FPM Configuration via Environment Variables</a>.
                </p>
            </div>
        </div>

        <div className="right">
            <MultiSelectInput
                data={ini.php.data}
                nameFormat={nameFormat}
                selected={props.form.php.value}
                onSelect={props.form.php.onChange}
            />
        </div>
    </div>
);

export default IniPhp;
