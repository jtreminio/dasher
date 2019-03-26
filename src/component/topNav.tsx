import * as React from "react";
import {
    Intent,
    Navbar,
} from "@blueprintjs/core";
import {
    IconNames,
} from "@blueprintjs/icons";

import RouterButton from "@app/component/routerButton";

const TopNav = () =>
    <Navbar id="top-nav" fixedToTop>
        <Navbar.Group>
            <RouterButton
                className="nav-item"
                exact
                icon={IconNames.LAYERS}
                intent={Intent.PRIMARY}
                minimal
                path="/service"
            >
                Services
            </RouterButton>

            <RouterButton
                className="nav-item"
                exact
                icon={IconNames.LAYERS}
                intent={Intent.PRIMARY}
                minimal
                path="/foo1"
            >
                Services
            </RouterButton>

            <RouterButton
                className="nav-item"
                exact
                icon={IconNames.LAYERS}
                intent={Intent.PRIMARY}
                minimal
                path="/foo2"
            >
                Services
            </RouterButton>
        </Navbar.Group>
    </Navbar>
;

export default TopNav;
