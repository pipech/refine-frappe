import {
    DataProvider,
    BaseRecord,
    GetListParams,
    GetListResponse,
    GetManyParams,
    GetManyResponse,
    CreateParams,
    CreateResponse,
    UpdateParams,
    UpdateResponse,
    GetOneParams,
    GetOneResponse,
    DeleteOneParams,
    DeleteOneResponse,
    CustomParams,
    CustomResponse,
} from "@refinedev/core";
import { FrappeApp } from "frappe-js-sdk";
import { FrappeDoc } from "frappe-js-sdk/lib/db/types";
import { handleError } from "../utils/handleError";
import { IDataProviderParams } from "../types";

/**
 * Casts an unknown value to the specified type.
 * This function is unsafe and should be used with caution.
 * @param v The value to be casted.
 * @returns The casted value.
 */
const unsafeCaster = <TVal>(v: unknown): TVal => {
    return v as TVal;
};

export default (
    params: IDataProviderParams,
): Omit<Required<DataProvider>, "createMany" | "updateMany" | "deleteMany"> => {
    const { url, tokenParams, name } = params;
    const client = new FrappeApp(url, tokenParams, name);

    return {
        getList: async <TData extends BaseRecord = BaseRecord>({
            resource,
            pagination,
            filters,
            sorters,
            meta,
        }: GetListParams): Promise<GetListResponse<TData>> => {
            try {
                const data = await client.db().getDocList<TData>(resource, {});
                return { data, total: data.length };
            } catch (e) {
                return Promise.reject(handleError(e));
            }
        },

        getMany: async <TData extends BaseRecord = BaseRecord>({
            resource,
            ids,
            meta,
        }: GetManyParams): Promise<GetManyResponse<TData>> => {
            try {
                const data = await client.db().getDocList<TData>(resource, {
                    filters: [["name", "in", ids]],
                });
                return { data };
            } catch (e) {
                return Promise.reject(handleError(e));
            }
        },

        // create: async <TData extends BaseRecord = BaseRecord>(
        //     params: CreateParams<Partial<TData>>,
        // ): Promise<CreateResponse<FrappeDoc<TData>>> => {
        // ---
        // Above is actual type
        // but I don't think I should modified the DataProvider type
        // since it'll be used by many functions
        // ---
        // So to get the proper type,
        // you should call
        // create<SalesOrderType>
        // -
        // TVariables will be imply by default
        create: async <
            TData extends BaseRecord = BaseRecord,
            TVariables = Partial<TData>,
        >(
            params: CreateParams<TVariables>,
        ): Promise<CreateResponse<FrappeDoc<TData>>> => {
            try {
                const { resource, variables, meta } = params;
                const cVariables = unsafeCaster<TData>(variables);
                const data = await client
                    .db()
                    .createDoc<TData>(resource, cVariables);

                return { data };
            } catch (e) {
                return Promise.reject(handleError(e));
            }
        },

        // Sames as create
        // ---
        // So to get the proper type,
        // you should call
        // update<SalesOrderType>
        // -
        // TVariables will be imply by default
        update: async <
            TData extends BaseRecord = BaseRecord,
            TVariables = Partial<TData>,
        >(
            params: UpdateParams<TVariables>,
        ): Promise<UpdateResponse<FrappeDoc<TData>>> => {
            try {
                const { resource, id, variables, meta } = params;
                const cVariables = unsafeCaster<TData>(variables);
                const data = await client
                    .db()
                    .updateDoc<TData>(resource, String(id), cVariables);
                return { data };
            } catch (e) {
                return Promise.reject(handleError(e));
            }
        },

        getOne: async <TData extends BaseRecord = BaseRecord>({
            resource,
            id,
            meta,
        }: GetOneParams): Promise<GetOneResponse<FrappeDoc<TData>>> => {
            try {
                const data = await client
                    .db()
                    .getDoc<TData>(resource, String(id));
                return { data };
            } catch (e) {
                return Promise.reject(handleError(e));
            }
        },

        // deleteDoc will always return { message: "ok" }
        // ---
        // So to get the proper type,
        // you should call
        // deleteOne<{ message: "ok"}>
        deleteOne: async <
            TData extends BaseRecord = BaseRecord,
            TVariables = {},
        >({
            resource,
            id,
        }: DeleteOneParams<TVariables>): Promise<DeleteOneResponse<TData>> => {
            try {
                const data = await client.db().deleteDoc(resource, String(id));
                // Response will always be { message: "ok" }
                const r = unsafeCaster<DeleteOneResponse<TData>>({
                    data: data.message,
                });
                return r;
            } catch (e) {
                return Promise.reject(handleError(e));
            }
        },

        custom: async <
            TData extends BaseRecord = BaseRecord,
            TQuery = unknown,
            TPayload = unknown,
        >(
            params: CustomParams<TQuery, TPayload>,
        ): Promise<CustomResponse<TData>> => {
            const call = client.call();

            const { url, method, payload } = params;

            let data;

            switch (method) {
                case "get":
                    data = await call.get<TData>(
                        url,
                        payload as Record<string, any>,
                    );
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

            return { data: data?.message };
        },

        getApiUrl: (): string => {
            return client.url;
        },
    };
};
