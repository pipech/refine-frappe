import { CrudFilter } from "@refinedev/core";
import { generateFilter } from "../../src/utils/generateFilter";

describe("generateFilter", () => {
    it("should return an empty array if no filters are provided", () => {
        const result = generateFilter();
        expect(result).toEqual([]);
    });

    it("should transform filters and return an array of FilterResponse", () => {
        const filters: CrudFilter[] = [
            { field: "name", operator: "eq", value: "John" },
            { field: "age", operator: "gt", value: 18 },
        ];
        const result = generateFilter(filters);
        expect(result).toEqual([
            ["name", "=", "John"],
            ["age", ">", 18],
        ]);
    });

    it("should throw an error for unsupported operators", () => {
        const filtersOr: CrudFilter[] = [
            {
                operator: "or",
                value: [
                    { field: "name", operator: "eq", value: "John" },
                    { field: "age", operator: "gt", value: 18 },
                ],
            },
        ];
        expect(() => generateFilter(filtersOr)).toThrow(
            `[refine-frappe]: \`filter\` must be a logical filter.`,
        );
        const filtersAnd: CrudFilter[] = [
            {
                operator: "and",
                value: [
                    { field: "name", operator: "eq", value: "John" },
                    { field: "age", operator: "gt", value: 18 },
                ],
            },
        ];
        expect(() => generateFilter(filtersAnd)).toThrow(
            `[refine-frappe]: \`filter\` must be a logical filter.`,
        );
        const filtersBoth: CrudFilter[] = [
            {
                operator: "and",
                value: [
                    { field: "name", operator: "eq", value: "John" },
                    { field: "age", operator: "gt", value: 18 },
                ],
            },
            {
                operator: "or",
                value: [
                    { field: "name", operator: "eq", value: "John" },
                    { field: "age", operator: "gt", value: 18 },
                ],
            },
        ];
        expect(() => generateFilter(filtersBoth)).toThrow(
            `[refine-frappe]: \`filter\` must be a logical filter.`,
        );
    });
});
