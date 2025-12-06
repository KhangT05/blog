import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"

const useTable = ({ pagination, models }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1;
    const [page, setPage] = useState(currentPage);
    const { data, isError, isLoading, refetch } = useQuery({
        queryKey: [models, page],
        queryFn: () => {
            const params = Object.fromEntries(searchParams.entries());
            return pagination({ ...params, page })
        }
    });
    const handlePageChange = (page) => {
        searchParams.set('page', page.toString());
        setPage(page);
    }
    useEffect(() => {
        setPage(currentPage);
    }, [currentPage]);
    return {
        data,
        isError,
        isLoading,
        refetch,
        handlePageChange,
        page
    }
}
export default useTable