import { useEffect } from 'react'
import useDebounce from '@/hooks/useDebounce'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from './ui/select'
import useFilter from '@/hooks/useFilter'
const CustomFilter = ({ filters, model, handleQueryString, refetch }) => {
    const { debounce } = useDebounce();
    const { filter, keyword, handleFilters, debounceInputSearch } = useFilter({ debounce });
    useEffect(() => {
        handleQueryString({ ...filter, keyword: keyword });
    }, [filter, keyword])
    return (
        <div className='flex'>
            {
                filters && filters.map((filter) => (
                    <Select
                        key={filter.key}
                        onValueChange={(value) => { handleFilters(value, filter.key) }}
                        defaultValue={filter.defaultValue}
                        name={filter.key}
                    >
                        <SelectTrigger className="w-[180px] mr-2 cursor-pointer">
                            <SelectValue placeholder={filter.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                filter.option.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                ))
            }
            {
                <div className='flex items-center space-x-2'>
                    <Input
                        className="w-40"
                        type="text"
                        placeholder="Nhập từ khóa..."
                        onChange={(e) => { debounceInputSearch(e.target.value) }}
                        defaultValue={keyword}
                    />
                    <Button
                        className="bg-sky-400 hover:bg-emerald-500 cursor-pointer">Tìm kiếm
                    </Button>
                </div>
            }
        </div >
    )
}
export default CustomFilter