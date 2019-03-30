import * as React from "react";
import {
    observer,
} from "mobx-react-lite";
import {
    Route,
    Switch,
    withRouter,
} from "react-router-dom";

import ServiceCreate from "@app/page/service/create";
import ServiceList   from "@app/page/service/list";

import Php       from "@app/page/service/create/php";
import PhpApache from "@app/page/service/create/phpApache";
import PhpNginx  from "@app/page/service/create/phpNginx";

const Page = observer(() => {
    return (
        <Switch>
            <Route component={ServiceCreate} exact path={[
                "/service/create",
            ]} />

            <Route component={ServiceList} exact path={[
                "/service/list",
            ]} />

            <Route component={Php} exact path={[
                "/service/create/php/:version",
                "/service/create/php",
            ]} />

            <Route component={PhpApache} exact path={[
                "/service/create/php-apache/:version",
                "/service/create/php-apache",
            ]} />

            <Route component={PhpNginx} exact path={[
                "/service/create/php-nginx/:version",
                "/service/create/php-nginx",
            ]} />

            <Route component={ServiceList} />
        </Switch>
    );
});

export default withRouter(Page);
