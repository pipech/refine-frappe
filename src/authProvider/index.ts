import { AuthBindings } from "@refinedev/core";
import { FrappeApp } from "frappe-js-sdk";
import { handleError } from "src/utils/handleError";

interface LoginParams {
    username: string;
    password: string;
    redirectTo?: string;
}

interface logoutParams {
    redirectTo?: string;
}

export default (client: FrappeApp): AuthBindings => ({
    login: async ({ username, password, redirectTo }: LoginParams) => {
        try {
            const response = await client.auth().loginWithUsernamePassword({
                username,
                password,
            });

            if (response) {
                return { success: true, redirectTo, ...response };
            }
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
});
