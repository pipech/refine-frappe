import { dataProvider } from "../../../src";
import { frappeConfig } from "../dataClient";

describe("create", () => {
    it("base", async () => {
        const response = await dataProvider(frappeConfig).create({
            resource: "ToDo",
            variables: {
                description: "Helo",
            },
        });

        const { data } = response;

        console.debug(response);
    });
});
