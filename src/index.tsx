import * as React    from "react";
import * as ReactDOM from "react-dom";
import {
    createBrowserHistory,
} from "history";
import {
    syncHistoryWithStore,
} from "mobx-react-router";
import {
    Router,
} from "react-router-dom";

import * as serviceWorker from "@app/serviceWorker";
import {
    store,
} from "@app/store";
import App  from "@app/App";
import init from "@app/store/init";

init().then(() => {
    console.log("Loading React");

    const history = syncHistoryWithStore(createBrowserHistory(), store.routing);

    ReactDOM.render(
        <Router history={history}>
            <App />
        </Router>
        , document.getElementById("root"),
    );

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: http://bit.ly/CRA-PWA
    serviceWorker.unregister();
});
