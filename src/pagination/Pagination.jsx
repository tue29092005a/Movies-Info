import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function App_Pagination({ pagination, onPageChange }) {
  // Destructuring dữ liệu từ schema của bạn
  const { current_page, total_pages } = pagination;

  // Nếu API trả về 0 trang hoặc 1 trang thì không cần hiện phân trang
  if (total_pages <= 1) return null;

  // Hàm tạo danh sách số trang cần hiển thị (Xử lý logic dấu ...)
  const generatePaginationItems = () => {
    const pages = [];
    const maxVisiblePages = 5; // Số lượng nút tối đa muốn hiện

    if (total_pages <= maxVisiblePages) {
      // Trường hợp ít trang: Hiện hết (1, 2, 3, 4, 5)
      for (let i = 1; i <= total_pages; i++) {
        pages.push(i);
      }
    } else {
      // Trường hợp nhiều trang: Xử lý logic ...
      // Luôn hiện trang 1
      pages.push(1);

      // Tính toán khoảng giữa (xung quanh trang hiện tại)
      let startPage = Math.max(2, current_page - 1);
      let endPage = Math.min(total_pages - 1, current_page + 1);

      // Thêm dấu ... bên trái
      if (startPage > 2) {
        pages.push("ellipsis-start");
      }

      // Thêm các trang ở giữa
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Thêm dấu ... bên phải
      if (endPage < total_pages - 1) {
        pages.push("ellipsis-end");
      }

      // Luôn hiện trang cuối
      pages.push(total_pages);
    }
    return pages;
  };

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        {/* NÚT PREVIOUS */}
        <PaginationItem>
          <PaginationPrevious 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (current_page > 1) onPageChange(current_page - 1);
            }}
            className={current_page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>

        {/* DANH SÁCH SỐ TRANG */}
        {generatePaginationItems().map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <PaginationItem key={page}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={page === current_page}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* NÚT NEXT */}
        <PaginationItem>
          <PaginationNext 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (current_page < total_pages) onPageChange(current_page + 1);
            }}
            className={current_page >= total_pages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}