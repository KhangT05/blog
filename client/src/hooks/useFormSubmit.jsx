import { useQueryClient, useMutation } from "@tanstack/react-query";
import { showToast } from "@/helper/myHelper";
import { useState } from "react";
const useFormSubmit = (submitFn, rejetch = null) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (payload) => submitFn(payload),
        onSuccess: (response) => {
            showToast('Cập nhật dữ liệu liệu thành công', 'success');
            if (rejetch) {
                queryClient.invalidateQueries(rejetch)
            }
            setIsSuccess(true)
        },
        onError: (error) => {
            showToast(error.response.data.message, 'error')
        }
    });
    const submitHandler = async (payload) => {
        return await mutation.mutateAsync(payload);
    }
    return {
        submitHandler,
        isSuccess,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
        data: mutation.data
    }
}
export default useFormSubmit