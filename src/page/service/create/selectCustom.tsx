import * as React from "react";
import {
    AnchorButton,
    Button,
    ButtonGroup,
    Card,
    Elevation,
    FormGroup,
    H3,
    HTMLSelect,
    Intent,
    Menu,
    MenuDivider,
    Popover,
    Position,
} from "@blueprintjs/core";
import {
    IconNames,
} from "@blueprintjs/icons";
import {
    observer,
} from "mobx-react-lite";
import * as _ from "lodash";

import RouterButton   from "@app/component/routerButton";
import RouterMenuItem from "@app/component/routerMenuItem";
import ServiceType    from "@app/entity/serviceType";
import StoreContext   from "@app/store";

const Page = observer(() => {
    const store = React.useContext(StoreContext);

    const categories = ["All"].concat(...store.service.serviceCategories());
    const serviceTypes = store.service.serviceTypes();

    const [selectedCategory, setSelectedCategory] = React.useState("All");

    const categoryChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.currentTarget.value);
    };

    const filteredTypes: ServiceType[] = _.values(serviceTypes).filter(type => {
        if (selectedCategory === "All") {
            return true;
        }

        // @ts-ignore
        return type.category.indexOf(selectedCategory) !== -1;
    });

    return (
        <>
            <div className="d-flex justify-content-end">
                <FormGroup inline label="Filter Categories:">
                    <HTMLSelect
                        fill
                        onChange={categoryChange}
                        value={selectedCategory}
                    >
                        {categories.map(category =>
                            <option key={category}>{category}</option>,
                        )}
                    </HTMLSelect>
                </FormGroup>
            </div>

            <div className="d-flex flex-wrap justify-content-around mt-5">
                <ListServiceTypes servicesTypes={filteredTypes} />
            </div>
        </>
    );
});

const ListServiceTypes = (props: {servicesTypes: ServiceType[]}) =>
    <>
        {props.servicesTypes.map(serviceType =>
            <div key={serviceType.image} className="service-box-container">
                <Card elevation={Elevation.TWO}>
                    <div className="logo"><img src={serviceType.logo} /></div>

                    <H3>{serviceType.name}</H3>

                    <p className="description">{serviceType.description}</p>

                    <div className="button-group-container">
                        <ButtonGroup>
                            <AnchorButton
                                className="mr-2"
                                href={serviceType.url}
                                target="_blank"
                                icon={IconNames.LINK}
                            >
                                info
                            </AnchorButton>

                            <VersionButton serviceType={serviceType} />
                        </ButtonGroup>
                    </div>
                </Card>
            </div>
        )}
    </>
;

const VersionButton = (props: {serviceType: ServiceType}) =>
    <>
        <RouterButton
            intent={Intent.PRIMARY}
            intentForce
            path={`/service/create/${props.serviceType.slug}`}
            rightIcon={
                props.serviceType.versions.length === 1
                    ? IconNames.CARET_RIGHT
                    : undefined
            }
        >
            {props.serviceType.versions[0] !== "latest" ? "Vers. " : ""}
            {props.serviceType.versions[0]}
        </RouterButton>

        {props.serviceType.versions.length > 1 &&
            <Popover
                content={<VersionDropdown serviceType={props.serviceType} />}
                position={Position.BOTTOM_RIGHT}
            >
                <Button rightIcon={IconNames.CARET_DOWN}
                        intent={Intent.PRIMARY} />
            </Popover>
        }
    </>
;

const VersionDropdown = (props: {serviceType: ServiceType}) =>
    <Menu>
        <MenuDivider title="Choose Version" />
        {props.serviceType.versions.map((version, key) =>
            <RouterMenuItem
                key={`${props.serviceType.slug}-${version}`}
                path={`/service/create/${props.serviceType.slug}/${version}`}
                text={`${version} ${key === 0 ? "(latest)" : ""}`}
            />,
        )}
    </Menu>
;
export default Page;
