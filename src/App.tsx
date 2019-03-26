import * as React from "react";
import {
    Route,
    Switch,
    withRouter,
} from "react-router-dom";

import "@app/asset/style.scss";
import BootstrapSize from "@app/component/bootstrapSize";
import BottomNav     from "@app/component/bottomNav";
import Sidebar       from "@app/component/sidebar";
import TopNav        from "@app/component/topNav";

import Home     from "@app/page/home";
import Services from "@app/page/service";

const App = () => <>
    <BootstrapSize />

    <Sidebar />

    <div className="flex-grow-1 d-flex flex-column">
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
    </div>
</>;

export default withRouter(App);

