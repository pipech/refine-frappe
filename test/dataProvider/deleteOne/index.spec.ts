import { DataProvider } from "../../../src";
import { frappe } from "../dataClient";

describe("deleteOne", () => {
    it("base", async () => {
        const response = await DataProvider(frappe).deleteOne({
            resource: "ToDo",
            id: "df0046d00c",
        });

        const { data } = response;

        console.debug(response);
    });
});
