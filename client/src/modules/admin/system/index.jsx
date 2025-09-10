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
const validateSchema = yup.object({
    site_name: yup.string()
        .min(6, "Vui lòng nhập từ 6 kí tự trở lên")
        .required('Vui lòng nhập tên site'),
    site_email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
    site_phone: yup.string()
        .matches(/^\d{10}$/, "Vui lòng nhập đủ 10 số")
        .required('Vui lòng nhập đủ 10 sô'),
})
const Setting = () => {
    const methods = useForm({
        resolver: yupResolver(validateSchema)
    });
    const { handleSubmit, formState: { errors } } = methods;
    const { submitHandler, isLoading } = useFormSubmit(store);
    useEffect(() => {
        console.log(errors)
    }, [errors])
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 max-w-md">
                <div>
                    <CustomInput
                        name="site_name"
                        label="site_name"
                        type="text"
                        required={true}
                    />
                    <CustomInput
                        name="site_email"
                        label="site_email"
                        type="text"
                        required={true}
                    />
                    <CustomInput
                        name="site_phone"
                        label="site_phone"
                        type="text"
                        required={true}
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
                <LoadingButton loading={isLoading} text="Lưu cài đặt" />

            </form>
        </FormProvider>
    )
}
export default Setting