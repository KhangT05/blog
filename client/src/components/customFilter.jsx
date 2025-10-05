import { Button } from './ui/button'
import { Form } from './ui/form'
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
                        <SelectTrigger className="w-[180px] mr-2">
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
        </div >
    )
}
export default CustomFilter