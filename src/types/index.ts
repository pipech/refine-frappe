import { TokenParams } from "frappe-js-sdk/lib/frappe_app/types";

export interface IDataProviderParams {
    url: string;
    tokenParams?: TokenParams;
    name?: string;
}
