import { CrudFilters, CrudOperators, LogicalFilter } from "@refinedev/core";

type FrappeFilter = [string, string, string];
type FilterResponse = FrappeFilter[];

export const mapOperator = (operator: CrudOperators): string => {
    if (operator === "or" || operator === "and") {
        throw new Error(
            `[@refinedev/frappe]: \`operator: ${operator}\` is not supported.`,
        );
    }

    const operatorsMap = {
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

    const a = operatorsMap[operator];

    if (a) {
        return a;
    }

    throw new Error(
        `[@refinedev/frappe]: \`operator: ${operator}\` is not supported. You can create custom data provider. https://refine.dev/docs/api-reference/core/providers/data-provider/#creating-a-data-provider`,
    );
};

const transformFilter = (filter: LogicalFilter): FrappeFilter => {
    const { field, operator, value } = filter;

    const mappedOperator = mapOperator(operator);

    return [field, mappedOperator, value];
};

// Only support simple andFilter for now
export const generateFilter = (filters?: CrudFilters): FilterResponse => {
    const queryFilters: FilterResponse = [];

    if (filters) {
        filters.map((filter) => {
            if (filter.operator === "or" || filter.operator === "and") {
                throw new Error(
                    `[@refinedev/simple-rest]: \`operator: ${filter.operator}\` is not supported. You can create custom data provider. https://refine.dev/docs/api-reference/core/providers/data-provider/#creating-a-data-provider`,
                );
            }

            if ("field" in filter) {
                queryFilters.push(transformFilter(filter));
            }
        });
    }

    return queryFilters;
};
