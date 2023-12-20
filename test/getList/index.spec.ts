import axios from "axios";

import DataProvider from "../../src/index";
import "./index.mock";

describe("create", () => {
    it("correct response", async () => {
        const response = await DataProvider(
            "https://api.fake-rest.refine.dev",
            axios,
        ).getList({
            resource: "animals",
        });

        const { data, total } = response;

        expect(total).toBe(1000);
    });
});
