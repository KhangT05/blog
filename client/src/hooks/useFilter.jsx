import { useState } from "react"
import { useSearchParams } from "react-router-dom";

const useFilter = ({ debounce }) => {
    const [searchParams, _] = useSearchParams();
    const [filter, setFilter] = useState({
        perpage: searchParams.get('perpage') || '10',
        status: searchParams.get('status') || undefined
    });
    const [keyword, setKeyword] = useState(
        searchParams.get('keyword') || ''
    );
    const handleFilters = (value, field) => {
        setFilter((prevFil) => ({ ...prevFil, [field]: value }))
    }
    const debounceInputSearch = debounce((value) => {
        setKeyword(value)
    }, 300);
    return {
        filter,
        keyword,
        handleFilters,
        debounceInputSearch
    }
}
export default useFilter