import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
const useTable = ({ pagination, models }) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const current = searchParams.get('page') ? parseInt(searchParams.get('page')) : '';

    const [isPage, setIsPage] = useState(current);
    const queryString = `page=${isPage}`
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: [models, queryString],
        queryFn: () => pagination(queryString)
    });
    const handlePageChange = (newPage) => {
        setIsPage(newPage)
    };

    useEffect(() => {
        navigate(`?${isPage}`, { replace: true })
    }, [navigate, isPage]);


    return {
        data,
        isLoading,
        isPage,
        isError,
        refetch,
        handlePageChange,
    }
}
export default useTable