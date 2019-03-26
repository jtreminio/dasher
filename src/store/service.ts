import cuid from "cuid";
import {
    action,
    computed,
    observable,
} from "mobx";
import {
    persist,
} from "mobx-persist";
import {
    matchPath,
} from "react-router-dom";

import {
    ServiceCategories,
} from "@app/data/service-categories";
import {
    store,
} from "@app/store";
import ServiceTypes from "@app/data/service-types";
import Service      from "@app/entity/service";
import ServiceType  from "@app/entity/serviceType";
import Form         from "@app/form/serviceForm";

export default class ServiceStore {
    @persist("list", Service) @observable
    protected Services: Service[] = [];

    get services(): Service[] {
        return this.Services
    }

    @computed
    get current(): Service | undefined {
        const match = matchPath(store.routing.location.pathname, {
            path: "/service/:serviceName",
        });

        if (!match) {
            return undefined;
        }

        // @ts-ignore
        return this.find(match.params.serviceId || "");
    }

    @action
    public add = (service: Service): number => {
        if (this.Services.some(s => s.name === service.name)) {
            return 0;
        }

        return this.Services.push(service)
    };

    public find = (name: string | undefined): Service | undefined => {
        name = name ? name.trim().toLowerCase() : "";

        return name
            ? this.services.find(s => s.name.toLowerCase() === name)
            : undefined;
    };

    @action
    public remove = (service: Service) =>
        this.Services = this.Services.filter(s => s.name !== service.name)
    ;

    @action
    public createFromForm = (form: Form): Service => {
        const service = new Service();
        service.name = form.name.$;
        service.version = form.version.$;
        service.type = form.type.$;
        service.meta = form.toJson();

        this.add(service);

        return service;
    };

    @action
    public updateFromForm = (service: Service, form: Form): Service => {
        service.name = form.name.$;
        service.version = form.version.$;
        service.type = form.type.$;
        service.meta = form.toJson();

        this.remove(service);
        this.add(service);

        return service;
    };

    public generateName = (type: ServiceType, defaultName?: string) => {
        const baseName = defaultName || type.slug;

        const servicesNames = this.Services.map(s => {
            return s.name;
        });

        if (servicesNames.indexOf(baseName) === -1) {
            return baseName;
        }

        for (let i = 1; i < 999; i++) {
            // 1 -> 001
            let num = i < 10 ? `00${i}` : i.toString();
            // 10 -> 010
            num = i < 100 ? `0${i}` : num;

            const name = `${baseName}_${num}`;

            if (servicesNames.indexOf(name) === -1) {
                return name;
            }
        }

        return `${baseName}_${cuid()}`;
    };

    public getServiceTypeBySlug = (slug: keyof typeof ServiceTypes): ServiceType => {
        return ServiceTypes[slug];
    };

    /**
     * If provided version string matches a version in type, returns that,
     * else returns default version of type
     *
     * @param type
     * @param versionCheck
     */
    public matchVersion = (
        type: ServiceType,
        versionCheck: string | undefined,
    ): string => {
        const version = versionCheck || type.versions[0];

        return type.versions.indexOf(version) !== -1
            ? version
            : type.versions[0];
    };

    public serviceTypes = () => {
        return ServiceTypes;
    };

    public serviceCategories = () => {
        return ServiceCategories
    };
}
