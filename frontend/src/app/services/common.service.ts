import axios from "axios";
import { ApiResponse } from "../types/api";
import { roleDropDownResponseType } from "../interface/common.interface";

// Common API Service :-
export const getAllRolesService = async (): Promise<
  ApiResponse<roleDropDownResponseType[]>
> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/common/role-dropdown`
  );

  return response.data as ApiResponse<roleDropDownResponseType[]>;
};
