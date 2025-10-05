import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog"
const CustomDialog = ({
    isOpen,
    title,
    description,
    closeAlertDialog,
    confirmAction,
    isDialogLoading
}) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={(open) => {
            if (!open && !isDialogLoading) {
                closeAlterDialog();
            }
        }}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={closeAlertDialog} className="hover:bg-red-200">
                        Hủy bỏ
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={confirmAction}
                        disabled={isDialogLoading} className="bg-sky-500 hover:bg-emerald-500">
                        {isDialogLoading ? 'Đang xử lý' : 'Xác nhận'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default CustomDialog