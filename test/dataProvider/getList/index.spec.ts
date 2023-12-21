import { DataProvider } from "../../../src";
import { frappeConfig } from "../dataClient";

describe("getList", () => {
    it("base", async () => {
        const response = await DataProvider(frappeConfig).getList({
            resource: "Sales Order",
        });

        const { data, total } = response;

        console.debug(response);
    });
});
