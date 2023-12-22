import { Pagination } from "@refinedev/core";

type FrappePagination = {
  limit_page_start: number;
  limit_page_length: number;
}

export const generatePagination = (props: Pagination): FrappePagination => {
  const { current=1, pageSize=10 } = props;
  
  return {
    limit_page_start: (current - 1) * pageSize,
    limit_page_length: pageSize,
  }
}