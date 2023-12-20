import DataProvider from "../../../src/index";
import { frappe } from "../dataClient";

describe("custom", () => {
    it("base", async () => {
        const response = await DataProvider(frappe).custom({
            url: "frappe.ping",
            method: "get",
        });

        const { data } = response;

        expect(data).toEqual("pong");
    });
});
