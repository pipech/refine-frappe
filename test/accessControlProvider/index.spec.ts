import { accessControlProvider } from "../../src";
import { frappeConfig } from "./dataClient";

describe("create", () => {
    it("base", async () => {
        const response = await accessControlProvider(frappeConfig).can({
            resource: "Sales Order",
            action: "Read",
            params: {
                docname: "SO-S0002-21030002",
            },
        });

        console.log(response);

        expect(response.can).toBe(true);
    });
});
