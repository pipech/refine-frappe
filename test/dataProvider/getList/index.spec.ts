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
