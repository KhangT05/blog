import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
const useTable = ({ pagination, models }) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const current = searchParams.get('page') ? parseInt(searchParams.get('page')) : 1;
    const [page, setPage] = useState(current);
    const handleChangePage = (page) => {
        setPage(page)
    }
    const { data, isLoading, isError, refetch } = useQuery([models, page], () => pagination(page))
    useEffect(() => {
        navigate(`?page=${page}`, { replace: true })
    }, [page])
    return {
        data,
        isLoading,
        isError,
        refetch,
        page,
        handleChangePage
    }
}
export default useTable