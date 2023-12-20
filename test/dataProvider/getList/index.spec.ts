import DataProvider from "../../../src/index";
import { frappe } from "../dataClient";

describe("getList", () => {
    it("base", async () => {
        const response = await DataProvider(frappe).getList({
            resource: "Sales Order",
        });

        const { data, total } = response;

        console.debug(response);
    });
});
