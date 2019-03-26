import {
    computed,
    observable,
} from "mobx";
import {
    persist,
} from "mobx-persist";

import {
    store,
} from "@app/store";
import ServiceTypes from "@app/data/service-types";
import ServiceType  from "@app/entity/serviceType";

export default class Service {
    @persist @observable
    protected Name: string = "";

    @persist @observable
    protected Version: string = "";

    @persist @observable
    protected Type: keyof typeof ServiceTypes;

    @persist("object") @observable
    protected Meta: { [key: string]: any } = {};

    @persist("object")
    protected Created = new Date();

    @persist @observable
    protected Project: string = "";

    set name(name: string) {
        this.Name = name.trim()
    };

    get name(): string {
        return this.Name
    };

    set version(version: string) {
        this.Version = version
    };

    get version(): string {
        return this.Version
    };

    set type(type: ServiceType) {
        // @ts-ignore
        this.Type = type.slug
    };

    @computed
    get type(): ServiceType {
        return store.service.getServiceTypeBySlug(this.Type)
    };

    set meta(meta: { [key: string]: any }) {
        this.Meta = meta
    };

    get meta() {
        return this.Meta
    };

    get created(): Date {
        return this.Created
    };
}
