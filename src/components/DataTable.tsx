import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";
import useWebsiteFormStore, { type Website } from "@/store/WebsiteStore";

const greyNiches = [
  "gray1.svg",
  "gray2.svg",
  "gray3.svg",
  "gray4.svg",
  "gray5.svg",
  "gray6.svg",
];
const ITEMS_PER_PAGE = 10;

const DataTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // const submissions = useWebsiteFormStore((state) => state.submissions);
  const submissions: Website[] = useWebsiteFormStore(
    (state) => state.submissions
  );
  const isLoading = useWebsiteFormStore((state) => state.isLoading);

  const navigate = useNavigate();
  const handleRowClick = (id: string) => {
    navigate(`/mywebsite/${id}`);
  };
  const totalPages = Math.ceil(submissions.length / ITEMS_PER_PAGE);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === currentPage}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Always show first page
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            isActive={1 === currentPage}
            onClick={() => handlePageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Show ellipsis if current page is far from start
      if (currentPage > 3) {
        pages.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === currentPage}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Show ellipsis if current page is far from end
      if (currentPage < totalPages - 2) {
        pages.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Always show last page
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            isActive={totalPages === currentPage}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };
  const getRandomRowColor = () => {
    const colors = ["bg-[#613FDD05]", "bg-[#613FDD05]"]; // white and light pink
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const renderSkeletonRows = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <TableRow key={`skeleton-${index}`} className="hover:bg-gray-50">
          <TableCell>
            <Skeleton className="h-4 w-[200px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[150px]" />
          </TableCell>
          <TableCell>
            <div className="flex gap-2">
              <Skeleton className="h-4 w-[60px]" />
              <Skeleton className="h-4 w-[60px]" />
            </div>
          </TableCell>
          <TableCell>
            <div className="flex gap-2">
              {greyNiches.map((_, idx) => (
                <Skeleton key={idx} className="h-4 w-4 rounded-full" />
              ))}
            </div>
          </TableCell>
        </TableRow>
      ));
  };

  return (
    <div className="w-full  rounded-md ">
      <Table className="min-w-full ">
        <TableHeader className="bg-gray-50 sticky top-0">
          <TableRow
            className="text-[#0F0C1B99] font-semibold text-[12px] leading-[16px] 
          tracking-[0px] dm-text-h1  py-[14px] px-[12px]"
          >
            <TableHead className="w-[250px] py-[14px] px-[12px]">
              Website
            </TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Other Categories</TableHead>
            <TableHead>Grey Niches</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          renderSkeletonRows()
        ) : submissions.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
              No websites found. Add your first website to get started.
            </TableCell>
          </TableRow>
        ) : (
          <TableBody>
            {submissions?.map((website, index) => (
              <TableRow
                key={index}
                className={`${getRandomRowColor()} hover:bg-gray-50 cursor-pointer`}
                onClick={() => handleRowClick(website?.id)}
              >
                <TableCell className="text-[#0F0C1B] inter-text font-normal text-[13px] leading-[18px] tracking-[0.25px] font-inter-text ">
                  <div className="flex items-center gap-2">
                    {website.websiteUrl}
                  </div>
                </TableCell>
                <TableCell className="text-[#0F0C1B] inter-text font-normal text-[13px] leading-[18px] tracking-[0.25px] font-inter-text ">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">
                      <img
                        src={`https://flagcdn.com/24x18/${website.primaryLanguage.toLowerCase()}.png`}
                        alt={website.primaryLanguage}
                        className="inline-block mr-2 w-[20px] h-[14px] rounded-sm object-cover"
                      />
                    </span>
                    {website.primaryLanguage}
                  </div>
                </TableCell>
                <TableCell className="text-[#0F0C1B] inter-text font-normal text-[13px] leading-[18px] tracking-[0.25px] font-inter-text ">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">
                      <img
                        src={`https://flagcdn.com/24x18/${website.trafficSource.toLowerCase()}.png`}
                        alt={website.trafficSource}
                        className="inline-block mr-2 w-[20px] h-[14px] rounded-sm object-cover"
                      />
                    </span>
                    {website.trafficSource}
                  </div>
                </TableCell>
                <TableCell className="text-[#0F0C1B] inter-text font-normal text-[13px] leading-[18px] tracking-[0.25px] font-inter-text ">
                  <Badge variant="default">{website.categories}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {website.categories.map((cat:string,index:number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {greyNiches.map((niche, index) => (
                      <img
                        src={`../assets/${niche}`}
                        alt=""
                        className=""
                        key={index}
                      />
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      {submissions.length > ITEMS_PER_PAGE && (
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {renderPaginationNumbers()}

              <PaginationItem>
                <PaginationNext
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default DataTable;
