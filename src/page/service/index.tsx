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

const Page = observer(() => {
    return (
        <Switch>
            <Route component={ServiceCreate} path={[
                "/service/create",
            ]} />

            <Route component={ServiceList} exact path={[
                "/service/list",
            ]} />

            <Route component={ServiceList} />
        </Switch>
    );
});

export default withRouter(Page);
