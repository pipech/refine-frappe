import { CrudOperators } from "@refinedev/core";

export const mapOperator = (operator: CrudOperators): string => {
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
    };

    const mappedOperator = operatorsMap[operator];

    const notImplementedOperators = [
        "containss",
        "ncontainss",
        "nbetween",
        "null",
        "nnull",
        "startswith",
        "nstartswith",
        "startswiths",
        "nstartswiths",
        "endswith",
        "nendswith",
        "endswiths",
        "nendswiths",
    ];
};
