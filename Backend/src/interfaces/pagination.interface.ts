export interface OffsetMetaType {
  mode: "offset";
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  sort?: "asc" | "desc";
  orderBy?: "createdAt" | "id";
}
