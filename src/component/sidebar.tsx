import * as React from "react";
import {
    Alignment,
    Intent,
    Navbar,
    NonIdealState,
} from "@blueprintjs/core";
import {
    IconNames,
} from "@blueprintjs/icons";

import RouterButton from "@app/component/routerButton";

const Sidebar = () =>
    <div id="sidebar">
        <Navbar fixedToTop className="sidebar-header">
            <Navbar.Group align={Alignment.CENTER}>
                <Navbar.Heading>
                    <RouterButton
                        active={false}
                        exact
                        icon={undefined}
                        large
                        minimal
                        path="/"
                    >
                        Dasher
                    </RouterButton>
                </Navbar.Heading>
            </Navbar.Group>
        </Navbar>

        <Navbar fixedToTop className="sidebar-body">
            <Navbar.Group align={Alignment.LEFT} className="mt-5">
                <NonIdealState
                    action={
                        <RouterButton
                            active={false}
                            intent={Intent.PRIMARY}
                            intentForce={true}
                            path="/service/create"
                            rightIcon={IconNames.CARET_RIGHT}
                        >
                            Add Service
                        </RouterButton>
                    }
                    className="d-block"
                    description={<p>Click below to add your first Service!</p>}
                    icon={IconNames.LAYERS}
                    title="No Services"
                />
            </Navbar.Group>
        </Navbar>
    </div>
;

export default Sidebar;
