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
import AppDetails   from "@app/component/service/appDetails";
import CreateSubmit from "@app/component/service/createSubmit";
import Form         from "@app/form/service/phpForm";
import StoreContext from "@app/store";

type Props = RouteComponentProps<{ version?: string }> & {}

const Create = observer<Props>(props => {
    const store = React.useContext(StoreContext);
    const serviceTypeSlug = "php";

    const sType = store.service.getServiceTypeBySlug(serviceTypeSlug);
    const sName = store.service.generateName(sType, serviceTypeSlug);
    const sVersion = store.service.matchVersion(sType, props.match.params.version);
    const phpModules: ModuleI = modules[`v${sVersion}`];

    const [form] = React.useState(() => {
        return new Form().fromObj({
            name: sName,
            type: sType,
            version: sVersion,
            appRoot: "./",
            php: ini.php.selected,
            fpm: ini.fpm.selected,
            xdebug: ini.xdebug.selected,
            modules: phpModules.selected,
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
