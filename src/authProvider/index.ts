import { AuthBindings } from "@refinedev/core";
import { AuthActionResponse } from "@refinedev/core/dist/interfaces";
import { FrappeApp } from "frappe-js-sdk";
import { handleError } from "../utils/handleError";
import { IFrappeProviderParams } from "src/types";
import Cookies from 'js-cookie'

interface LoginParams {
    email: string;
    password: string;
    redirectTo?: string;
}

interface logoutParams {
    redirectTo?: string;
}

export default (params: IFrappeProviderParams): AuthBindings => {
    const { url, name } = params;
    const client = new FrappeApp(url, undefined, name);

    return {
    login: async ({
        email,
        password,
        redirectTo,
    }: LoginParams): Promise<AuthActionResponse> => {
        try {
            const response = await client.auth().loginWithUsernamePassword({
                username: email,
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
    logout: async () => {
        try {
            await client.auth().logout();
            return {
                success: true,
                redirectTo: "/login",
            };
        } catch (error) {
            console.error(error)
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
        if (!Cookies.get('user_id') || Cookies.get('user_id') === 'Guest') {
            return {
                authenticated: false,
                redirectTo: "/login",
            };
        }

        try {
            const user = await client.auth().getLoggedInUser();
            if (user) {
                return { authenticated: true };
            }
        } catch (error: any) {
            if (error?.exc_type !== "PermissionError") {
                console.error(error);
            }
        }
        
        return {
            authenticated: false,
            redirectTo: "/login",
        };
    },
    getIdentity: async () => {
        const user = await client.auth().getLoggedInUser();

        return {
            id: user,
            name: user,
            avatar: "https://i.pravatar.cc/300",
        };
    },
    getPermissions: () => Promise.resolve(),
}};
