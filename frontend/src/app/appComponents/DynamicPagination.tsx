import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Dispatch, SetStateAction } from "react";

export interface DynamicPaginationPropType {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPage: number;
}
export function DynamicPagination({
  currentPage,
  setCurrentPage,
  totalPage,
}: DynamicPaginationPropType) {
  console.log("CUrrent Page", currentPage);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={currentPage === 1}
            onClick={() => {
              if (currentPage === 1) return;
              console.log("Click on Previous Button");
              setCurrentPage(currentPage - 1);
            }}
            className={`${
              currentPage === 1 && "bg-gray-100 cursor-not-allowed"
            }`}
          >
            {" "}
            Previous{" "}
          </PaginationPrevious>
        </PaginationItem>
        {new Array(totalPage).fill(0).map((_, index) => {
          return (
            <PaginationItem key={index + 1}>
              <PaginationLink
                onClick={() => setCurrentPage(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            aria-disabled={currentPage === totalPage}
            onClick={() => {
              if (currentPage === totalPage) return;
              console.log("Click on Next Button");
              setCurrentPage(currentPage + 1);
            }}
            className={`${
              currentPage === totalPage && "bg-gray-100 cursor-not-allowed"
            }`}
          >
            {" "}
            Next{" "}
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
