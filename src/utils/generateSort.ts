import { CrudSorting } from "@refinedev/core";

export const generateSort = (sorters?: CrudSorting): string | undefined => {
    console.debug(sorters);
    if (!(sorters && sorters.length > 0)) {
        return undefined;
    }

    const sorterList = sorters.map((item) => {
        return `${item.field} ${item.order}`;
    });

    return sorterList.join(",");
};
