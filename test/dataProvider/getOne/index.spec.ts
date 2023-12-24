import { dataProvider } from "../../../src";
import { frappeConfig } from "../dataClient";

describe("getOne", () => {
    it("base", async () => {
        const response = await dataProvider(frappeConfig).getOne({
            resource: "Sales Order",
            id: "SO-S0001-23070002",
        });

        const { data } = response;

        console.debug(response);
    });
});
