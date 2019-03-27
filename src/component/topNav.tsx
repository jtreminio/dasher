import * as React from "react";
import {
    Alignment,
    AnchorButton,
    Intent,
    Navbar,
} from "@blueprintjs/core";
import {
    IconNames,
} from "@blueprintjs/icons";
import {
    FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";
import {
    faGithub,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";

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

        <Navbar.Group align={Alignment.RIGHT} className="d-none d-md-flex">
            <Navbar.Divider />

            <AnchorButton
                href="#"
                large
                minimal
                target="_blank"
            >
                <FontAwesomeIcon icon={faTwitter} size="lg" />
            </AnchorButton>

            <AnchorButton
                href="#"
                large
                minimal
                target="_blank"
            >
                <FontAwesomeIcon icon={faGithub} size="lg" />
            </AnchorButton>
        </Navbar.Group>
    </Navbar>
;

export default TopNav;
