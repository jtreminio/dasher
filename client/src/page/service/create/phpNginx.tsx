import * as React from "react";
import {
    Button,
    Classes,
    Code,
    H1,
    Intent,
} from "@blueprintjs/core";
import {
    IconNames,
} from "@blueprintjs/icons";
import {
    observer,
} from "mobx-react-lite";
import {
    RouteComponentProps,
    withRouter,
} from "react-router-dom";

import {
    IniFpm,
    IniPhp,
    IniXdebug,
    ModulePhp,
} from "@app/component/service/php";
import {
    ini,
    modules,
    ModuleI,
} from "@app/data/php";
import AppDetails    from "@app/component/service/appDetails";
import CreateSubmit  from "@app/component/service/createSubmit";
import NginxAppVhost from "@app/component/service/nginxAppVhost";
import vhosts        from "@app/data/nginx";
import Form          from "@app/form/service/phpWebForm";
import StoreContext  from "@app/store";

type Props = RouteComponentProps<{ version?: string }> & {}

const link1 = "https://jtreminio.com/blog/all-in-one-php-fpm-nginx-apache-containers/";

const Create = observer<Props>(props => {
    const store = React.useContext(StoreContext);
    const serviceTypeSlug = "php-nginx";

    const sType = store.service.getServiceTypeBySlug(serviceTypeSlug);
    const sName = store.service.generateName(sType, "web");
    const sVersion = store.service.matchVersion(sType, props.match.params.version);
    const phpModules: ModuleI = modules[`v${sVersion}`];
    const allVhosts = vhosts.filter(vhost => {
        return vhost.engine === "php" || vhost.engine === "none";
    });

    const [form] = React.useState(() => {
        const vhost = vhosts.find(v => v.type === "fpm");

        return new Form().fromObj({
            name: sName,
            type: sType,
            version: sVersion,
            appRoot: "./",
            php: ini.php.selected,
            fpm: ini.fpm.selected,
            xdebug: ini.xdebug.selected,
            modules: phpModules.selected,
            vhost: "awesome.localhost",
            vhostType: vhost!.type,
            vhostData: vhost!.data,
        })
    });

    const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        await CreateSubmit({e, form, store});

        if (form.form.hasError) {
            return;
        }

        store.routing.push(`/service`);
    };

    return (
        <div id="page">
            <form className="service-form" onSubmit={onSubmit}>
                <div className="page-header">
                    <H1>Create New {form.type.value.name} Service</H1>
                    <div className="page-subtitle">
                        <a href={form.type.value.url}
                           target="_blank">{form.type.value.image}:{form.version.value}</a>
                    </div>
                </div>

                <AppDetails form={form}>
                    <p className={Classes.TEXT_MUTED}>
                        Composer comes pre-installed and is available
                        as <Code className="text-nowrap">$ composer</Code>.
                    </p>
                </AppDetails>

                <NginxAppVhost form={form} allVhosts={allVhosts}>
                    <p className={Classes.TEXT_MUTED}>
                        The container comes with Nginx configs for several common PHP applications.
                        You can select one from the dropdown, or create your own custom config.
                    </p>

                    <p className={Classes.TEXT_MUTED}>
                        For more information about <Code>$cookie_XDEBUG_SESSION</Code> and&nbsp;
                        <Code>$my_fastcgi_pass</Code> you can read my blog post,&nbsp;
                        <a href={link1} target="_blank">All-in-One PHP-FPM +
                            Nginx/Apache Containers</a>.
                    </p>
                </NginxAppVhost>

                <IniPhp form={form} />

                <IniFpm form={form} />

                <IniXdebug form={form} />

                <ModulePhp form={form} allModules={phpModules} />

                <p className="text-right">
                    <Button
                        intent={Intent.SUCCESS}
                        large
                        rightIcon={IconNames.PLUS}
                        type="submit"
                    >
                        Create Service
                    </Button>
                </p>
            </form>
        </div>
    );
});

export default withRouter(Create);
