import * as React from "react";
import {
    AnchorButton,
    IButtonProps,
    Intent,
} from "@blueprintjs/core";
import {
    IconName,
} from "@blueprintjs/icons";
import {
    observer,
} from "mobx-react-lite";
import {
    Route,
    RouteComponentProps,
    withRouter,
} from "react-router-dom";

import StoreContext from "@app/store";

type Props = RouteComponentProps & IButtonProps & {
    active?: boolean,
    children?: React.ReactNode,
    exact?: boolean,
    icon?: IconName,
    intent?: Intent,
    intentForce?: boolean,
    path: string,
    style?: React.CSSProperties,
}

const RouterButton = observer<Props>(props => {
    const store = React.useContext(StoreContext);

    const {
        exact,
        history,
        intentForce,
        location,
        match,
        path,
        staticContext,
        ...buttonProps
    } = props;

    const onClick = (to: string) => store.routing.push(to);

    // Set intent last else will always be intent passed from caller, ignoring match
    return (
        <Route
            exact={exact}
            path={path}
            children={({match}: { match: boolean }) =>
                <AnchorButton
                    active={match}
                    onClick={() => onClick(props.path)}
                    {...buttonProps}
                    intent={match || intentForce ? props.intent : undefined}
                />
            }
        />
    );
});

export default withRouter(RouterButton);
