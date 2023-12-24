import { generatePagination } from "../../src/utils/generatePagination";

describe("generatePagination", () => {
    it("should generate pagination object with default values", () => {
        const pagination = generatePagination({});

        expect(pagination).toEqual({
            limit_page_start: 0,
            limit_page_length: 10,
        });
    });

    it("should generate pagination object with custom values", () => {
        const pagination = generatePagination({
            current: 3,
            pageSize: 20,
        });

        expect(pagination).toEqual({
            limit_page_start: 40,
            limit_page_length: 20,
        });
    });
});
