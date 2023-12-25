import { generateSort } from "../../src/utils/generateSort";

describe("generateSort", () => {
    it("should generate sort object with default values", () => {
        const sort = generateSort([]);

        expect(sort).toEqual(undefined);
    });
    it("should generate sort object with default values", () => {
        const sort = generateSort([{ field: "shop", order: "asc" }]);

        expect(sort).toEqual("shop asc");
    });
    it("should generate sort object with default values", () => {
        const sort = generateSort([
            { field: "shop", order: "desc" },
            { field: "name", order: "asc" },
        ]);

        expect(sort).toEqual("shop desc,name asc");
    });
});
