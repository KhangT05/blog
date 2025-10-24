import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"

// const useTable = ({ pagination, models }) => {
//     const navigate = useNavigate();
//     const [searchParams, setSearchParams] = useSearchParams();
//     const currentPage = parseInt(searchParams.get('page')) || 1;
//     const [page, setPage] = useState(currentPage);
//     const params = {
//         ...page,
//         filters
//     };
//     const { data, isError, isLoading, refetch } = useQuery({
//         queryKey: [models, page],
//         queryFn: () => {
//             const params = Object.fromEntries(searchParams.entries());
//             return pagination({ ...params, page })
//         }
//     });
//     const [queryString, setQueryString] = useState(() => {
//         const query = Object.keys(params).filter(key => {
//             const value = params[key];
//             return !(value === null || value === 0 || value === '' || value === undefined)
//         }).reduce((acc, key) => {
//             acc[key] = params[key];
//             return {};
//         })
//     })
//     const handlePageChange = (page) => {
//         searchParams.set('page', page.toString());
//         setSearchParams(searchParams);
//         setPage(page);
//     }
//     const [filters, setFilters] = useState({});
//     useEffect(() => {
//         setPage(currentPage);
//     }, [currentPage]);
//     const handleQueryString = useCallback((filterParam) => {
//         setFilters(filterParam);
//     }, []);
//     useEffect(() => {
//         const query = Object.keys(filters)
//             .filter(key => {
//                 const value = filters[key];
//                 return !(value === undefined || value === null || value === '' || value === 0)
//             }).reduce(key => {
//                 if (page && page >= 1) {

//                 }
//             })
//         const mainQueryString = `page=${page}${query !== '' ? `&${query}` : ''}`
//         setQueryString(mainQueryString)
//     }, [page, filters])
//     return {
//         data,
//         isError,
//         isLoading,
//         refetch,
//         handlePageChange,
//         handleQueryString,
//         queryString,
//         page
//     }
// }
// export default useTable
const useTable = ({ pagination, models }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const currentPage = parseInt(searchParams.get('page')) || 1;
    const [page, setPage] = useState(currentPage);
    const { data, isError, isLoading, refetch } = useQuery({
        queryKey: [models, page],
        queryFn: () => pagination(page)
    });
    const handlePageChange = (newPage) => {
        setPage(newPage);
        // console.log(navigate(`?page=${newPage}`, { replace: true }))
        console.log(`?page=${newPage}`)
    }
    const handleQueryString = () => {

    }
    return {
        data,
        isError,
        isLoading,
        refetch,
        handlePageChange,
        handleQueryString,
        page
    }
}
export default useTable