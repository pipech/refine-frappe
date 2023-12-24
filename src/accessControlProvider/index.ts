import {
    AccessControlProvider,
    CanParams,
    CanReturnType,
} from "@refinedev/core";
import { IFrappeProviderParams } from "src/types";
import { FrappeApp } from "frappe-js-sdk";
import { handleError } from "../utils/handleError";

export default (params: IFrappeProviderParams): AccessControlProvider => {
    const { url, name } = params;
    const client = new FrappeApp(url, undefined, name);

    return {
        /**
         * Checks if the user has permission to perform the specified action on the given resource.
         * @param resource - DocType for which permission is to be check.
         * @param action - Permission type (`read`, `write`, `create`, `submit`, `cancel`, `amend`).
         * @param params - {
         *  docname?: string;
         * }
         * @returns A promise that resolves to an object indicating whether the user has permission.
         */
        can: async ({
            resource,
            action,
            params,
        }: CanParams): Promise<CanReturnType> => {
            try {
                const perm = await client
                    .call()
                    .get("frappe.client.has_permission", {
                        doctype: resource,
                        perm_type: action,
                        docname: params?.docname,
                    });
                return {
                    can: Boolean(perm.has_permission),
                };
            } catch (error) {
                return {
                    can: false,
                    reason: handleError(error).message,
                };
            }
        },
    };
};
