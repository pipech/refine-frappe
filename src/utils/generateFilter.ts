import {
    CrudFilter,
    CrudFilters,
    CrudOperators,
    LogicalFilter,
} from "@refinedev/core";

type FrappeFilter = [string, string, string];
type FilterResponse = FrappeFilter[];

const OPERATOR_MAP = {
    eq: "=",
    ne: "!=",
    lt: "<",
    gt: ">",
    lte: "<=",
    gte: ">=",
    in: "in",
    nin: "not in",
    contains: "like",
    ncontains: "not like",
    between: "between",
};
const UNSUPPORTED_OPERATORS_MAP = {
    and: undefined,
    or: undefined,
    containss: undefined,
    ncontainss: undefined,
    nbetween: undefined,
    null: undefined,
    nnull: undefined,
    startswith: undefined,
    nstartswith: undefined,
    startswiths: undefined,
    nstartswiths: undefined,
    endswith: undefined,
    nendswith: undefined,
    endswiths: undefined,
    nendswiths: undefined,
};
const CRUD_OPERATORS: Record<CrudOperators, string | undefined> = {
    ...OPERATOR_MAP,
    ...UNSUPPORTED_OPERATORS_MAP,
};
const OPERATOR_LIST = Object.keys(OPERATOR_MAP);

/**
 * Maps a CRUD operator to its corresponding string representation.
 * @param operator - The CRUD operator to map.
 * @returns The string representation of the mapped operator.
 * @throws Error if the provided operator is not supported.
 * @example
 * mapOperator("eq");
 * return: "="
 */
export const mapOperator = (operator: CrudOperators): string => {
    const mappedOperator = CRUD_OPERATORS[operator];
    if (mappedOperator) {
        return mappedOperator;
    }
    throw new Error(
        `[refine-frappe]: \`operator: ${operator}\` is not supported.`,
    );
};

/**
 * Transforms a logical filter into a Frappe filter.
 * @param filter - The logical filter to transform.
 * @returns The transformed Frappe filter.
 * @example
 * transformFilter({
 *   field: 'name',
 *   operator: 'equals',
 *   value: 'John Doe'
 * });
 * return: ['name', '=', 'John Doe']
 */
const transformFilter = (filter: CrudFilter): FrappeFilter => {
    if (!("field" in filter)) {
        throw new Error(
            `[refine-frappe]: \`filter\` must be a logical filter.`,
        );
    }
    const { field, operator, value } = filter;
    const mappedOperator = mapOperator(operator);
    return [field, mappedOperator, value];
};

/**
 * Generates a filter response based on the provided filters.
 * @param filters - The filters to generate the response from only supports andFilter for now
 * @returns The generated filter response.
 * @example
 * generateFilter([
 *  { field: 'name', operator: 'eq', value: 'John' },
 * { field: 'age', operator: 'gt', value: 18 },
 * ]);
 * return: [
 * ['name', '=', 'John'],
 * ['age', '>', 18],
 * ]
 */
export const generateFilter = (filters?: CrudFilters): FilterResponse => {
    // If no filters are provided, return an empty array.
    if (!filters) {
        return [];
    }

    const queryFilters: FilterResponse = [];
    filters.map((filter) => {
        queryFilters.push(transformFilter(filter));
    });
    return queryFilters;
};
