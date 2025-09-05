import {
    Pagination,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
    PaginationLink,
    PaginationContent,
    PaginationEllipsis
} from '@/components/ui/pagination'
import page from '@/hooks/useTable'

const Paginate = () => {
    return (
        <>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    )
}
export default Paginate