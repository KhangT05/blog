import {
    Pagination,
    PaginationContent,
    PaginationPrevious,
    PaginationItem,
    PaginationLink,
    PaginationNext
} from '@/components/ui/pagination'

const Paginate = ({ links, pageChange }) => {
    const activeLinks = links.findIndex((link) => link.index);
    const filterLinks = links.filter((_, index) => {
        return (index !== 0 && index !== index.length === 0) && (
            index >= activeLinks - 3 && index <= activeLinks + 3)
    });
    const handlePageChange = (page) => {
        pageChange(page)
    }
    return (
        <Pagination>
            <PaginationContent>
                {
                    activeLinks > 1 && (
                        <PaginationItem>
                            <PaginationPrevious onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(parseInt(links[activeLinks - 1].label))
                            }} className="cursor-pointer" />
                        </PaginationItem>
                    )
                }
                {
                    filterLinks.map((link, index) => {
                        <PaginationItem key={index}>
                            <PaginationLink onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(parseInt(links[activeLinks]))
                            }} className="cursor-pointer"> {link.label} </PaginationLink>
                        </PaginationItem>
                    })
                }
                {
                    activeLinks < links.length - 1 && (
                        <PaginationItem>
                            <PaginationNext onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(parseInt(links[activeLinks + 1].label))
                            }} className="cursor-pointer" />
                        </PaginationItem>
                    )
                }
            </PaginationContent>
        </Pagination>
    )
}
export default Paginate