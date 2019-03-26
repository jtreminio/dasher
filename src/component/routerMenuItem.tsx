import * as React from "react";
import {
    MenuItem,
    IMenuItemProps,
} from "@blueprintjs/core";
import {
    observer,
} from "mobx-react-lite";
import {
    Route,
    RouteComponentProps,
    withRouter,
} from "react-router-dom";

import StoreContext from "@app/store";

type Props = RouteComponentProps & IMenuItemProps & {
    exact?: boolean,
    intentForce?: boolean,
    path: string,
    style?: React.CSSProperties,
}

const RouterMenuItem = observer<Props>(props => {
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
                <MenuItem
                    active={match}
                    onClick={() => onClick(props.path)}
                    {...buttonProps}
                    intent={match || intentForce ? props.intent : undefined}
                />
            }
        />
    );
});

export default withRouter(RouterMenuItem);
