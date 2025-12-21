// Creating the role Dropdown API -

import { Request, Response, NextFunction } from "express";
import { getAllRolesDropDown } from "../repository/common.repo";
import { errorHandler } from "../handler/error.handler";
import { asyncHandler } from "../handler/async.handler";
import { responseHandler } from "../handler/response.handler";

export const getRolesDropDown = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const getAllRoles = await getAllRolesDropDown();

    if (!getAllRoles || (getAllRoles && !getAllRoles.length)) {
      return errorHandler(res, "No roles are specified in the database", 400);
    }

    // Return all Roles In the response

    return responseHandler(res, "All roles DropDown", 200, getAllRoles);
  }
);
