import { Button } from './ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from './ui/select'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardAction,
    CardContent,
    CardFooter
} from './ui/card'
import { Link } from 'react-router-dom'
const CustomToolbar = (
) => {
    return (
        <div className='flex'>
            <div>
                <h2>abc</h2>
                <span>abccc</span>
            </div>
            {/* <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="20 ban ghi" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="5">5 ban ghi</SelectItem>
                    <SelectItem value="10">10  ban ghi</SelectItem>
                    <SelectItem value="20">20  ban ghi</SelectItem>
                </SelectContent>
            </Select> */}
            <Button>
                {/* <Link to={}>Them ban ghi moi</Link> */}
            </Button>
        </div>
    )
}
export default CustomToolbar