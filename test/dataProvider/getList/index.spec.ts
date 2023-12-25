import { dataProvider } from "../../../src";
import { frappeConfig } from "../dataClient";

describe("getList", () => {
    it("base", async () => {
        const response = await dataProvider(frappeConfig).getList({
            resource: "Sales Order",
        });

        const { data, total } = response;

        console.debug(response);
    });
});

describe("getList: sorter", () => {
    it("basic sort", async () => {
        const response = await dataProvider(frappeConfig).getList({
            resource: "Sales Order",
            sorters: [{ field: "shop", order: "asc" }],
        });
        console.debug(response);
    });
    it("2 column sort", async () => {
        const response = await dataProvider(frappeConfig).getList({
            resource: "Sales Order",
            sorters: [
                { field: "shop", order: "desc" },
                { field: "name", order: "desc" },
            ],
        });
        console.debug(response);
    });
});
