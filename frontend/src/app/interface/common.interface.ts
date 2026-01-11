export interface roleDropDownResponseType {
  id: number;
  roleName: string;
}

export interface PaginationInterfaceType {
  page: number;
  limit: number;
  search?: string;
}
