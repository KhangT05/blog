import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
/**CUSTOMIZE */
import useFormSubmit from "@/hooks/useFormSubmit";
import CustomInput from "@/components/customInput";
import LoadingButton from '@/components/LoadingButton';
/** SERVICES */
import { store } from '@/services/SettingServices';
import { toast } from 'sonner';
const Setting = () => {
    const schema = yup.object({
        site_name: yup.string()
            .min(6, "Vui lòng nhập từ 6 kí tự trở lên")
            .required('Vui lòng nhập tên site'),
        site_email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
        site_phone: yup.string()
            .matches(/^\d{10}$/, "Vui lòng nhập đủ 10 số")
            .required('Vui lòng nhập đủ 10 sô'),
    });
    const methods = useForm({
        resolver: yupResolver(schema)
    });
    const { handleSubmit, formState: { errors } } = methods;
    const { submitHandler, isLoading, isSuccess } = useFormSubmit(store);
    useEffect(() => {
    }, [errors]);
    useEffect(() => {
        if (isSuccess) {

        }
    })
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 max-w-md">
                <div>
                    <CustomInput
                        name="site_name"
                        label="site_name"
                        type="text"
                    />
                    <CustomInput
                        name="site_email"
                        label="site_email"
                        type="text"
                    />
                    <CustomInput
                        name="site_phone"
                        label="site_phone"
                        type="text"
                    />
                    <CustomInput
                        name="site_address"
                        label="site_address"
                        type="text"
                    />
                    <CustomInput
                        name="site_social"
                        label="site_social"
                        type="text"
                    />
                </div>
                <LoadingButton loading={isLoading} className={"bg-sky-600"} text="Lưu lại" />
            </form>
        </FormProvider>
    )
}
export default Setting