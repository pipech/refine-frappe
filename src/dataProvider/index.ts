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
import { FrappeDoc, Filter } from "frappe-js-sdk/lib/db/types";
import { handleError } from "../utils/handleError";
import { generateFilter } from "../utils/generateFilter";
import { generatePagination } from "../utils/generatePagination";
import { generateSort } from "../utils/generateSort";
import { IFrappeProviderParams } from "../types";

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
    params: IFrappeProviderParams,
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
                // We'll only support andFilter for now,
                // it'll reduce complication
                // and we can't get correct total count
                // since getCount doesn't support orFilter
                const fpFilters = unsafeCaster<Filter<FrappeDoc<TData>>[]>(
                    generateFilter(filters),
                );
                const fpPagination = generatePagination(pagination || {});
                // Incorrect type ???
                const fpSorter = generateSort(sorters);

                // This api doesn't support multiple order by
                // const data = await client.db().getDocList<TData>(resource, {
                //     fields: ["name"],
                //     filters: fpFilters,
                //     orderBy: fpSorter,
                //     limit_start: fpPagination.limit_page_start,
                //     limit: fpPagination.limit_page_length,
                // });

                // Hot-fix
                const dataB = await client
                    .call()
                    .get("frappe.client.get_list", {
                        doctype: resource,
                        fields: ["name"],
                        filters: fpFilters,
                        order_by: fpSorter,
                        limit_start: fpPagination.limit_page_start,
                        limit: fpPagination.limit_page_length,
                    });
                const data: TData[] = dataB.message || [];

                // frappe.get_count doesn't consider permissions (or custom permissions)
                // so we'll get count using get_count from reportview
                // const total = await client.db().getCount(resource, fpFilters);
                let total = await client
                    .call()
                    .get("frappe.desk.reportview.get_count", {
                        filters: fpFilters,
                        doctype: resource,
                    });
                total = total.message || 0;
                // let total = await client.db().getDocList<TData>(resource, {
                //     fields: ['count("name")'],
                //     filters: fpFilters,
                // });

                // total = total[0]['count("name")'];

                // loop and map "name" to "id"
                data.forEach((d) => {
                    d.id = d.name;
                });
                const r = { data, total };
                return { data, total };
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
