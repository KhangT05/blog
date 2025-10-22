import { Button } from './ui/button'
import { Input } from './ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from './ui/select'
const CustomFilter = ({ filters, models }) => {
    return (
        <div className='flex'>
            {
                filters && filters.map((filter) => (
                    <Select
                        key={filter.key}
                        onValueChange={() => { }}
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
                    />
                    <Button className="bg-sky-400 hover:bg-emerald-500 cursor-pointer">Tìm kiếm</Button>
                </div>
            }
        </div >
    )
}
export default CustomFilter