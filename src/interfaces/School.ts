import SchoolImage from "../images/school.png";

export enum StateEnum {
    ALL = "all",
    ACT = "act",
    NSW = "nsw",
    NT = "nt",
    QLD = "qld",
    SA = "sa",
    TAS = "tas",
    VIC = "vic",
    WA = "wa",
}

export const states: { [key: string]: string } = {
    ALL: "All",
    ACT: "Australia Capital Territory",
    NSW: "New South Wales",
    NT: "Northern Territory",
    QLD: "Queensland",
    SA: "South Australia",
    TAS: "Tasmania",
    VIC: "Victoria ",
    WA: "Western Australia",
} as const;

export type State = typeof states;
export type StateCode = keyof State;

export interface School {
    id: number;
    name: string;
    street: string;
    city: string;
    postcode: string;
    state: string;
    country: string;
    image: string;
    subscription: number;
    active_subscription: number;
    abn: string;
    contact_name: string;
    phone: string;
    email: string;
    billing_entity?: string;
    billing_abn: string;
    billing_street: string;
    billing_city: string;
    billing_postcode: string;
    billing_state: string;
    billing_country: string;
    is_active: boolean;
    img?: string;
    house_number?: string;
    billing_house_number?: string;
}
export interface Contact {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}
export interface Billing {
    entity: string;
    address: string;
    abn: string;
    state: string;
}
