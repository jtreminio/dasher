import * as React from "react";
import {
    Alignment,
    H1,
    Navbar,
    Tab,
    TabId,
    Tabs,
} from "@blueprintjs/core";
import {
    observer,
} from "mobx-react-lite";
import {
    RouteComponentProps,
    withRouter,
} from "react-router-dom";

import SelectBundle from "@app/page/service/create/selectBundle";
import SelectCustom from "@app/page/service/create/selectCustom";

type Props = RouteComponentProps<{ projectId: string }> & {}

const Page = observer<Props>(props => {
    const [tab, setTab] = React.useState<React.ReactText>("custom");

    return (
        <div id="page">
            <div className="page-header">
                <H1>Create New Service</H1>
                <div className="page-options">
                    <Navbar>
                        <Navbar.Group>
                            <Navbar.Heading>
                                Choose Type:
                            </Navbar.Heading>
                        </Navbar.Group>
                        <Navbar.Group align={Alignment.RIGHT}>
                            <Tabs id="create-service-tabs" animate large
                                  selectedTabId={tab}
                                  onChange={(tab: TabId) => setTab(tab)}
                            >
                                <Tab id="custom">Custom</Tab>
                                <Tab id="bundle">Bundle</Tab>
                            </Tabs>
                        </Navbar.Group>
                    </Navbar>
                </div>
            </div>

            <Tabs id="create-service-panels" selectedTabId={tab}
                  renderActiveTabPanelOnly={false}>
                <Tab id="custom" panel={<SelectCustom />} />
                <Tab id="bundle" panel={<SelectBundle />} />
            </Tabs>
        </div>
    );
});

export default withRouter(Page);
