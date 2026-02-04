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
import { AlertCircle } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import CustomCard from '@/components/customCard';
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
        <>
            <div className='max-w-4xl'>
                <div className='mb-6'>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Cài đặt hệ thống
                    </h1>
                    <div className='flex gap-1 items-center'>
                        <AlertCircle className='w-3 h-3' />
                        <p>Lưu ý:</p>
                    </div>
                    <p>Các mục đánh dấu<span className='text-red-500 font-semibold'> (*) </span> là bắt buộc</p>
                </div>
                <CustomCard
                    openHeader={true}
                    title={"Thông tin website"}
                    desc={"Tạo mới các thông tin website"}
                >
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
                            <div className='grid gird-cols-1 md:grid-cols-2 gap-6'>
                                <CustomInput
                                    name="name"
                                    label="Tên website"
                                    type="text"
                                />
                                <CustomInput
                                    name="email"
                                    label="Email liên hệ"
                                    type="text"
                                />
                                <CustomInput
                                    name="phone"
                                    label="Số điện thoại liên hệ"
                                    type="text"
                                />
                                <CustomInput
                                    name="site_address"
                                    label="site_address"
                                    type="text"
                                />
                                <CustomInput
                                    name="site_fb"
                                    label="Facebook website"
                                    type="text"
                                />
                                <CustomInput
                                    name="site_ins"
                                    label="Ins website"
                                    type="text"
                                />
                            </div>
                            <LoadingButton loading={isLoading} className={"bg-sky-600"} text="Lưu lại" />
                        </form>
                    </FormProvider>
                </CustomCard>
            </div>
        </>
    )
}
export default Setting