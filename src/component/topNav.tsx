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
        <div className="container">
            <div className="row">
                <Navbar.Group>
                    <Navbar.Heading>
                        <RouterButton
                            active={false}
                            exact
                            icon={undefined}
                            large
                            path="/"
                            minimal
                        >
                            Dasher
                        </RouterButton>
                    </Navbar.Heading>

                    <Navbar.Divider />

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
            </div>
        </div>
    </Navbar>
;

export default TopNav;
