import { dataProvider } from "../../../src";
import { frappeConfig } from "../dataClient";

describe("deleteOne", () => {
    it("base", async () => {
        const response = await dataProvider(frappeConfig).deleteOne({
            resource: "ToDo",
            id: "df0046d00c",
        });

        const { data } = response;

        console.debug(response);
    });
});
