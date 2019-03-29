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
import {
    RouteComponentProps,
    withRouter,
} from "react-router-dom";

import RouterButton from "@app/component/routerButton";

type Props = RouteComponentProps<{ projectId: string }> & {}

import axios from "axios";

const Page = observer<Props>(props => {
    (async () => {
        await axios('http://dasher.localhost/api/containers/json', {

        })
        .then(res => {
            console.log(res.data);
        });
    })();

    return (
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
});

export default withRouter(Page);
