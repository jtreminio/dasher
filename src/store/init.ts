// import localForage  from "localforage";
import {
    configure,
} from "mobx";
import {
    create,
} from "mobx-persist";

import {
    store,
} from "@app/store";

configure({
    enforceActions: "observed",
});

const init = async () => {
    const hydrate = create({
        // storage: localForage,
        jsonify: true,
    });

    const storage = window.localStorage;

    await hydrate("Service", store.service, storage.service)
        .then(() => {
            console.log("Service Store has been hydrated")
        });

    return hydrate;
};

export default init;
