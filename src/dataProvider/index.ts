import { DataProvider } from "@refinedev/core";
import { FrappeApp } from "frappe-js-sdk";
import { handleError } from "../utils/handleError";

export default (
    client: FrappeApp,
): Omit<
    Required<DataProvider>,
    "createMany" | "updateMany" | "deleteMany"
> => ({
    getList: async ({ resource, pagination, filters, sorters, meta }) => {
        try {
            const data = await client.db().getDocList(resource, {});
            return { data, total: data.length };
        } catch (e) {
            return Promise.reject(handleError(e));
        }
    },

    getMany: async ({ resource, ids, meta }) => {
        try {
            const data = await client.db().getDocList(resource, {
                filters: [["name", "in", ids]],
            });
            return { data };
        } catch (e) {
            return Promise.reject(handleError(e));
        }
    },

    create: async <TData>({ resource, variables, meta }) => {
        try {
            const data = await client
                .db()
                .createDoc<TData>(resource, variables);
            return { data };
        } catch (e) {
            return Promise.reject(handleError(e));
        }
    },

    update: async <TData>({ resource, id, variables, meta }) => {
        try {
            const data = await client
                .db()
                .updateDoc<TData>(resource, id, variables);
            return { data };
        } catch (e) {
            return Promise.reject(handleError(e));
        }
    },

    getOne: async <TData>({ resource, id, meta }) => {
        try {
            const data = await client.db().getDoc<TData>(resource, id);
            return { data };
        } catch (e) {
            return Promise.reject(handleError(e));
        }
    },

    deleteOne: async <TData>({ resource, id, variables, meta }) => {
        try {
            const data = await client.db().deleteDoc(resource, String(id));
            return { data: data.message } as TData;
        } catch (e) {
            return Promise.reject(handleError(e));
        }
    },

    custom: async <TData>({ url, method, payload }) => {
        const call = client.call();

        let data;

        switch (method) {
            case "get":
                data = await call.get<TData>(url, payload);
                break;
            case "post":
                data = await call.post<TData>(url, payload);
                break;
            case "put":
                data = await call.put<TData>(url, payload);
                break;
            case "delete":
                data = await call.delete<TData>(url, payload);
                break;
        }

        return { data: data.message };
    },

    getApiUrl: () => {
        return client.url;
    },
});
