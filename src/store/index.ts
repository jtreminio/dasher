import * as React from "react";
import {
    RouterStore,
} from "mobx-react-router";

import ServiceStore from "@app/store/service";

const store = {
    routing: new RouterStore(),
    service: new ServiceStore(),
};

const StoreContext = React.createContext(store);

export default StoreContext;
export {
    store,
};
