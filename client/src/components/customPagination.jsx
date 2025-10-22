import {
    Pagination,
    PaginationContent,
    PaginationPrevious,
    PaginationItem,
    PaginationLink,
    PaginationEllipsis,
    PaginationNext
} from './ui/pagination'

const CustomPagination = ({ pagination, pageChange }) => {
    const { currentPage, totalPages } = pagination;
    const generatePageNumber = () => {
        const page = [];
        // const start = Math.max(1, currentPage - 2);
        // const end = Math.min(totalPages, currentPage + 2);
        for (let i = currentPage; i <= totalPages; i++) {
            page.push(i);
        }
        return page;
    }
    const pageNum = generatePageNumber();
    return (
        <Pagination>
            <PaginationContent className="cursor-pointer">
                {/* {
                    currentPage
                } */}
                {
                    currentPage > 1 && (
                        <PaginationItem>
                            <PaginationPrevious
                                aria-disabled={currentPage === 1}
                                onClick={(e) => {
                                    e.preventDefault();
                                    pageChange(currentPage - 1)
                                }} />
                        </PaginationItem>
                    )
                }
                {
                    pageNum.map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink onClick={(e) => {
                                e.preventDefault();
                                pageChange(page)
                            }}
                                isActive={page === currentPage} > {page} </PaginationLink>
                        </PaginationItem>
                    ))
                }
                {
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                }
                {
                    currentPage < totalPages && (
                        <PaginationItem>
                            <PaginationNext onClick={(e) => {
                                e.preventDefault();
                                pageChange(currentPage + 1)
                            }} />
                        </PaginationItem>
                    )
                }
            </PaginationContent>
        </Pagination>
    )
}
export default CustomPagination