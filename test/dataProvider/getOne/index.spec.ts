import DataProvider from "../../../src/index";
import { frappe } from "../dataClient";

describe("getOne", () => {
    it("base", async () => {
        const response = await DataProvider(frappe).getOne({
            resource: "Sales Order",
            id: "SO-S0001-23070002",
        });

        const { data } = response;

        console.debug(response);
    });
});
