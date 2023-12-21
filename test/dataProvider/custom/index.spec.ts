import { DataProvider } from "../../../src";
import { frappeConfig } from "../dataClient";

describe("custom", () => {
    it("base", async () => {
        const response = await DataProvider(frappeConfig).custom({
            url: "frappe.ping",
            method: "get",
        });

        const { data } = response;

        expect(data).toEqual("pong");
    });
});
