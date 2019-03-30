import * as React from "react";
import {
    H1,
    Intent,
    NonIdealState,
} from "@blueprintjs/core";
import {
    IconNames,
} from "@blueprintjs/icons";
import {
    observer,
} from "mobx-react-lite";

import RouterButton from "@app/component/routerButton";

const Page = observer(() =>
    <div id="page">
        <div className="page-header">
            <H1>Services</H1>
        </div>

        <NonIdealState
            icon={IconNames.LAYERS}
            title="No Services found"
            description={<p>Click below to add your first Service!</p>}
            action={
                <RouterButton
                    intent={Intent.PRIMARY}
                    intentForce
                    path="/service/create"
                    rightIcon={IconNames.CARET_RIGHT}
                >
                    Add Service
                </RouterButton>
            }
        />
    </div>
);

export default Page;
