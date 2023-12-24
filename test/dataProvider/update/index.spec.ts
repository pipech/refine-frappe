import { dataProvider } from "../../../src";
import { frappeConfig } from "../dataClient";

describe("update", () => {
    it("base", async () => {
        const response = await dataProvider(frappeConfig).update({
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
