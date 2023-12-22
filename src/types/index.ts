import { TokenParams } from "frappe-js-sdk/lib/frappe_app/types";

export interface IDataProviderParams {
    url: string;
    tokenParams?: TokenParams;
    name?: string;
}

export interface IAuthProviderParams {
    url: string;
    name?: string;
}

export interface IAccessControlProviderParams {
    url: string;
    name?: string;
}