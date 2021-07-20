export interface IAddress {
    readonly id: number;
    addressLine: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
}