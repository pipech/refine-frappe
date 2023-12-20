import DataProvider from "../../../src/index";
import { frappe } from "../dataClient";

describe("getMany", () => {
    it("base", async () => {
        const response = await DataProvider(frappe).getMany({
            resource: "Sales Order",
            ids: ["SO-S0001-23070002", "SO-S0004-21030011"],
        });

        const { data } = response;

        console.debug(response);
    });
});
