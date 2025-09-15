import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHeader,
    TableRow,
    TableHead
} from '@/components/ui/table'
const CustomTable = ({ breadcrumb }) => {
    return (
        <Table>
            <TableCaption> {breadcrumb} </TableCaption>
        </Table>
    )
}
export default CustomTable