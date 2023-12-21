import { DataProvider } from "../../../src";
import { frappeConfig } from "../dataClient";

describe("getMany", () => {
    it("base", async () => {
        const response = await DataProvider(frappeConfig).getMany({
            resource: "Sales Order",
            ids: ["SO-S0001-23070002", "SO-S0004-21030011"],
        });

        const { data } = response;

        console.debug(response);
    });
});
