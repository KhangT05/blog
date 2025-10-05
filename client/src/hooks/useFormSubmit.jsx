import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
const useFormSubmit = (submitFn, rejetch = null) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (payload) => submitFn(payload),
        onSuccess: (response) => {
            toast.success('Cập nhật dữ liệu liệu thành công', {
                description: response.data.message
            });
            if (rejetch) {
                queryClient.invalidateQueries(rejetch)
            }
            setIsSuccess(true)
        },
        onError: (error) => {
            console.log(error.response.data.message)
            toast.error('Thông báo từ hệ thống', {
                description: error?.response?.data?.message
            })
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