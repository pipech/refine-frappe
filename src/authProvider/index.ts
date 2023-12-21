import { AuthBindings } from "@refinedev/core";
import { AuthActionResponse } from "@refinedev/core/dist/interfaces";
import { FrappeApp } from "frappe-js-sdk";
import { handleError } from "../utils/handleError";
import { IAuthProviderParams } from "src/types";

interface LoginParams {
    username: string;
    password: string;
    redirectTo?: string;
}

interface logoutParams {
    redirectTo?: string;
}

export default (params: IAuthProviderParams): AuthBindings => {
    const { url, name } = params;
    const client = new FrappeApp(url, undefined, name);

    return {
    login: async ({
        username,
        password,
        redirectTo,
    }: LoginParams): Promise<AuthActionResponse> => {
        try {
            const response = await client.auth().loginWithUsernamePassword({
                username,
                password,
            });

            if (response) {
                return { success: true, redirectTo, ...response };
            }
            return {
                success: false,
                error: handleError({
                    message: "An unknown error occurred while logging in.",
                }),
            };
        } catch (error) {
            return {
                success: false,
                error: handleError(error),
            };
        }
    },
    logout: async ({ redirectTo }: logoutParams) => {
        try {
            await client.auth().logout();

            return {
                success: true,
                redirectTo,
            };
        } catch (error) {
            return {
                success: false,
            };
        }
    },
    onError: async (error) => {
        console.error(error);
        return { error };
    },
    check: async () => {
        const user = await client.auth().getLoggedInUser();
        if (user) {
            return { authenticated: true };
        }
        return { authenticated: false };
    },
    getIdentity: async () => {
        const user = await client.auth().getLoggedInUser();

        return { user };
    },
    getPermissions: () => Promise.resolve(),
}};
