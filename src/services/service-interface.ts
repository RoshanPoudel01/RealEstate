import { Row } from "@tanstack/react-table";

export interface RootResponse<T> {
  status: boolean;
  message: string;
  data: Data<T>;
}
export interface SingleResponse<T> {
  message?: string;
  status?: boolean;
  data: T;
}

export interface Data<T> {
  count: number;
  rows: T[];
  pagination?: Pagination;
}

export interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  next_page_url?: any;
  prev_page_url?: any;
  last_page_url: string;
  first_page_url: string;
}

export interface IRow<T> {
  row: Row<T>;
}
