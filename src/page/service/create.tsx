import * as React from "react";
import {
    observer,
} from "mobx-react-lite";
import {
    Route,
    Switch,
    withRouter,
} from "react-router-dom";

import Php    from "@app/page/service/create/php";
import Select from "@app/page/service/create/select";

const Create = observer(() =>
    <Switch>
        <Route component={Php} exact path={[
            "/service/create/php/:version",
            "/service/create/php",
        ]} />

        <Route component={Select} />
    </Switch>
);

export default withRouter(Create);
