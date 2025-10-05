import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react"
import { toast } from "sonner";

const useDialog = (refetch) => {
    const [alertDialogOpen, setAlterDialog] = useState(false);
    const [currentAction, setCurrentAction] = useState(null);
    const openAlterDialog = useCallback((id, callback) => {
        setCurrentAction({ id, callback });
        setAlterDialog(true);
    }, []);
    const closeAlertDialog = useCallback(() => {
        setAlterDialog(false);
        setCurrentAction(null);
    }, [])
    const mutation = useMutation({
        mutationFn: (id) => currentAction?.callback(currentAction.id),
        onSuccess: (response) => {
            closeAlertDialog();
            setCurrentAction(null);
            toast.success('Cập nhật dữ liệu liệu thành công', {
                description: response.data.message
            });
            if (refetch) {
                refetch();
            }
        },
        onError: (error) => {
            closeAlertDialog();
            setCurrentAction(null);
            toast.error('Thông báo từ hệ thống', {
                description: error?.response?.data?.message
            })
        }
    })
    const confirmAction = useCallback(() => {
        if (currentAction) {
            mutation.mutate(currentAction.id);
        }
    }, [currentAction]);
    return {
        alertDialogOpen,
        openAlterDialog,
        closeAlertDialog,
        confirmAction,
        setCurrentAction,
        isLoading: mutation.isPending
    }
}
export default useDialog