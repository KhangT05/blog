import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
const useTable = ({ pagination, models }) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const current = searchParams.get('page') ? parseInt(searchParams.get('page')) : 1;
    const initialFilterParams = {};

    searchParams.forEach((value, key) => {
        if (key !== 'page') {
            initialFilterParams[key] = value || ''
        }
    });


    const [page, setPage] = useState(current);
    const [filter, setFilter] = useState(initialFilterParams);
    const buildQueryString = (currentePage, currentFilter) => {
        const filter = Object.keys(currentFilter).filter((key) => {
            const value = currentFilter[key]
            return !(value === null || value === '' || value === undefined || value === 0)
        }).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(initialFilterParams[key])}`)
            .join("&")
        const pageQuery = currentePage > 1 ? `page=${currentePage}` : '';
        const queryParts = [pageQuery, filter].filter(part => part !== '');
        return queryParts.join("&");
    }
    const [queryString, setQueryString] = useState(() => {
        return buildQueryString(current, initialFilterParams)
    })
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: [models, queryString],
        queryFn: () => pagination(queryString || 'page=1')
    });
    const handlePageChange = (page) => {
        setPage(page)
    };

    const hanldeFilterChange = useCallback((filterParam) => {
        setFilter(filterParam);
        setPage(1);
    }, []);
    useEffect(() => {
        const newQueryString = buildQueryString(page, filter);
        setQueryString(newQueryString)
    }, [page, filter]);


    useEffect(() => {
        navigate(`?${queryString}`, { replace: true })
    }, [refetch, navigate, queryString]);


    return {
        data,
        isLoading,
        page,
        filter,
        isError,
        refetch,
        handlePageChange,
        hanldeFilterChange
    }
}
export default useTable