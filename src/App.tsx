import * as React from "react";
import {
    Route,
    Switch,
    withRouter,
} from "react-router-dom";

import "@app/asset/style.scss";
import BootstrapSize from "@app/component/bootstrapSize";
import BottomNav     from "@app/component/bottomNav";
import TopNav        from "@app/component/topNav";

import Home     from "@app/page/home";
import Services from "@app/page/service";

const App = () => <>
    <BootstrapSize />

    <TopNav />

    <main>
        <Switch>
            <Route component={Home} exact path="/" />
            <Route component={Services} path={[
                "/service",
            ]} />
        </Switch>
    </main>

    <BottomNav />
</>;

export default withRouter(App);

