import {
    Pagination,
    PaginationContent,
    PaginationPrevious,
    PaginationItem,
    PaginationLink,
    PaginationNext
} from './ui/pagination'

const Paginate = ({ pagination, pageChange }) => {
    const { currentPage, totalPages } = pagination;
    const generatePageNumber = () => {
        const page = [];
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, currentPage + 2);
        for (let i = start; i <= end; i++) {
            page.push(i);
        }
        return page;
    }
    const pageNum = generatePageNumber();
    return (
        <Pagination>
            <PaginationContent>
                {
                    currentPage > 1 && (
                        <PaginationItem>
                            <PaginationPrevious onClick={() => {
                                pageChange(currentPage - 1)
                            }} className="cursor-pointer" />
                        </PaginationItem>
                    )
                }
                {
                    pageNum.map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink onClick={() => {
                                pageChange(page)
                            }}
                                isActive={page === currentPage} > {page} </PaginationLink>
                        </PaginationItem>
                    ))
                }
                {
                    currentPage < totalPages && (
                        <PaginationItem>
                            <PaginationNext onClick={() => {
                                pageChange(currentPage + 1)
                            }} className="cursor-pointer" />
                        </PaginationItem>
                    )
                }
            </PaginationContent>
        </Pagination>
    )
}
export default Paginate