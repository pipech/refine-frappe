import { DataProvider } from "../../../src";
import { frappe } from "../dataClient";

describe("update", () => {
    it("base", async () => {
        const response = await DataProvider(frappe).update({
            resource: "ToDo",
            id: "31fb9d4e0b",
            variables: {
                description: "hi",
            },
        });

        const { data } = response;

        console.debug(response);
    });
});
