import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    TableHead
} from './ui/table'
import { Switch } from './ui/switch'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import CustomDialog from './customDialog'
import useDialog from '@/hooks/useDialog'
const CustomTable = ({
    isLoading,
    isError,
    models,
    data,
    tableColumn,
    destroy,
    refetch,
    buttonActions,
}) => {
    const {
        isLoading: isDialogLoading,
        openAlterDialog,
        closeAlertDialog,
        alertDialogOpen,
        confirmAction
    } = useDialog(refetch);
    // const { handleChecked, setInitalColumnState, columnState } = useColumnState();
    // useEffect(() => {
    //     if (!isLoading && data[models]) {
    //         setInitalColumnState(data[models], 'status')
    //     }
    // }, [isLoading, data])
    return (
        <>
            <Table className="border border-solid">
                <TableHeader className="w-sm">
                    <TableRow>
                        {
                            tableColumn && tableColumn.map((column, index) => (
                                <TableHead key={index} className="text-center">
                                    {column.name}
                                </TableHead>
                            ))
                        }
                        <TableHead className={"text-center"}>Trạng Thái</TableHead>
                        <TableHead className={""}>Hoạt Động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        isLoading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={tableColumn?.length || 1}
                                    className="text-center">
                                    Loading...
                                </TableCell>
                            </TableRow>

                        ) : isError ? (
                            <TableRow>
                                <TableCell
                                    colSpan={tableColumn?.length || 1}
                                    className="text-center text-red-500">
                                    Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.
                                </TableCell>
                            </TableRow>
                        ) :
                            (
                                (data?.[models] ?? []).length > 0 ? (
                                    data[models].map((row, index) => (
                                        <TableRow key={index}>
                                            {
                                                tableColumn && tableColumn.map((column, index) => (
                                                    <TableCell key={index} className={"text-center"}>
                                                        {
                                                            column.render(row)
                                                        }
                                                    </TableCell>
                                                ))
                                            }
                                            <TableCell className={"text-center"}>
                                                <Switch
                                                    value={row.id}
                                                    checked={row.status}
                                                    onCheckedChange=
                                                    {() => handleSwitchStatus(row.id, row.status, models)}
                                                    className="data-[state=checked]:bg-emerald-500 cursor-pointer"
                                                />
                                            </TableCell>
                                            <TableCell className="flex space-x-2">
                                                {buttonActions && buttonActions.map((action, index) => (
                                                    action.path ? (
                                                        <Link
                                                            to={`${action.path}${row.id}`}
                                                            className={`${action.className}`}
                                                        >
                                                            {action.icon}
                                                        </Link>
                                                    ) : (
                                                        <Button
                                                            key={index}
                                                            className={`h-1${action.className} bg-sky-500`}
                                                            onClick={
                                                                action.onClick ? (
                                                                    () => {
                                                                        if (action.method === 'update') {
                                                                            action.onClick(row.id, row.name, openAlterDialog)
                                                                        } else if (action.method === 'delete') {
                                                                            action.onClick(row.id, destroy, openAlterDialog)
                                                                        }
                                                                    }
                                                                ) : undefined
                                                            }>
                                                            {action.icon}
                                                        </Button>
                                                    )
                                                ))}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={tableColumn.length + 3} className="text-center">Không có dữ liệu phù hợp để hiển thị.</TableCell>
                                    </TableRow>
                                ))
                    }
                </TableBody>
            </Table >
            <CustomDialog
                isOpen={alertDialogOpen}
                title="Xác nhận hành động"
                description="Bạn có chắc chắn muốn thực hiện hành động này? 
                Hành động này không thể hoàn tác."
                closeAlertDialog={closeAlertDialog}
                confirmAction={confirmAction}
                isDialogLoading={isDialogLoading}
            />
        </>
    )
}
export default CustomTable