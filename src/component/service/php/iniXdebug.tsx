import * as React from "react";
import {
    Callout,
    Card,
    Checkbox,
    Classes,
    Code,
    Collapse,
    Elevation,
    H2,
    Intent,
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
const link1 = "https://github.com/jtreminio/php-docker/blob/master/Dockerfile-env#L597-L661";

const IniXdebug = observer<Props>(props => {
    const enableOnChange = () => props.form.xdebugEnabled.onChange(
        !props.form.xdebugEnabled.value,
    );

    return (
        <section>
            <H2>Xdebug INI</H2>

            <p>
                <Checkbox
                    checked={props.form.xdebugEnabled.value}
                    label="Enable Xdebug for Web Browser Debugging
                           (Do NOT enable for production!)"
                    large
                    onChange={enableOnChange}
                />
            </p>

            <Collapse isOpen={props.form.xdebugEnabled.value}>
                <p className={Classes.TEXT_MUTED}>
                    Xdebug is installed <em>but not enabled for FPM</em> by default.
                    It is always available for CLI via <Code>$ xdebug</Code>. For
                    example, you can use the following to debug your programs via
                    CLI, <Code>$ xdebug foo.php</Code>
                </p>

                <p className={Classes.TEXT_MUTED}>
                    <a href={link1} target="_blank">Click here for all default values.</a>
                </p>

                <Card elevation={Elevation.TWO}>
                    <MultiSelectInput
                        data={ini.xdebug.data}
                        nameFormat={nameFormat}
                        selected={props.form.xdebug.value}
                        onSelect={props.form.xdebug.onChange}
                    />

                    <Callout className="mt-3" intent={Intent.PRIMARY}>
                        Leave <Code>xdebug.remote_host</Code> as&nbsp;
                        <Code>dockerhost</Code> which is a special hostname provided
                        by <a href="https://github.com/qoomon/docker-host"
                              target="_blank">qoomon/docker-host</a> that will be added
                        to your Project. Use this instead
                        of <Code>host.docker.internal</Code> to connect to the host!
                    </Callout>
                </Card>
            </Collapse>
        </section>
    );
});

export default IniXdebug;
