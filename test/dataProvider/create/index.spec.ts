import DataProvider from "../../../src/index";
import { frappe } from "../dataClient";

describe("create", () => {
    it("base", async () => {
        const response = await DataProvider(frappe).create({
            resource: "ToDo",
            variables: {
                description: "Helo",
            },
        });

        const { data } = response;

        console.debug(response);
    });
});
