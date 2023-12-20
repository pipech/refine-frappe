import axios from "axios";

import DataProvider from "../../src/index";

describe("create", () => {
    it("correct response", async () => {
        const response = await DataProvider(
            "https://alpha-be.cafn.dev",
            axios,
        ).getList({
            resource: "animals",
        });

        const { data, total } = response;

        expect(total).toBe(1000);
    });
});
