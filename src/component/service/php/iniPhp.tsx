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
const link1 = "https://github.com/jtreminio/php-docker/blob/master/Dockerfile-env#L3-L595";
const link2 = "https://jtreminio.com/blog/docker-php/php-fpm-configuration-via-environment-variables/";

const IniPhp = observer<Props>(props =>
    <div className="d-flex flex-column">
        <div>
            <H3>PHP INI</H3>

            <div className={`${Classes.TEXT_MUTED} ml-3`}>
                <p>
                    <a href={link1} target="_blank">Click here for all default values.</a>
                </p>

                <p>
                    INI settings are set using environment variables. For more information
                    you can read my blog
                    post, <a href={link2} target="_blank">
                        Docker PHP/PHP-FPM Configuration via Environment Variables</a>.
                </p>
            </div>
        </div>

        <div className="mt-3 px-2">
            <MultiSelectInput
                data={ini.php.data}
                nameFormat={nameFormat}
                onSelect={props.form.php.onChange}
                selected={props.form.php.value}
            />
        </div>
    </div>
);

export default IniPhp;
