import * as React from "react";
import {
    AnchorButton,
    Icon,
    Intent,
    Navbar,
} from "@blueprintjs/core";
import {
    IconNames,
} from "@blueprintjs/icons";

const BottomNav = () =>
    <Navbar id="bottom-bar">
        <Navbar.Group>
            <Navbar.Heading>
                Made with&nbsp;
                <Icon
                    icon={IconNames.HEART}
                    iconSize={Icon.SIZE_LARGE}
                    intent={Intent.DANGER}
                />
                &nbsp;by Juan Treminio
            </Navbar.Heading>

            <Navbar.Divider />

            <AnchorButton
                href="https://jtreminio.com"
                icon={IconNames.BOOKMARK}
                minimal
                target="_blank"
                text="Blog"
            />

            <AnchorButton
                href="https://twitter.com/juantreminio"
                icon={IconNames.ENDORSED}
                minimal
                target="_blank"
                text="Twitter"
            />

            <AnchorButton
                href="https://github.com/puphpet/puphpet"
                icon={IconNames.CODE}
                minimal
                target="_blank"
                text="GitHub"
            />

            <AnchorButton
                href="https://kiwiirc.com/client/chat.freenode.net/#dasher"
                icon={IconNames.CHAT}
                minimal
                target="_blank"
                text="IRC"
            />
        </Navbar.Group>
    </Navbar>
;

export default BottomNav;
