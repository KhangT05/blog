// COMPONENTS
import Heading from "@/components/heading"
import CustomInput from "@/components/customInput"
import CustomCard from "@/components/customCard"
import CustomNotice from "@/components/customNotice"
import useFormSubmit from "@/hooks/useFormSubmit"
import LoadingButton from "@/components/LoadingButton"
// SETTINGS
import { headingConfig, models } from "../settings/index"
// HOOKS FORM
import { FormProvider, useForm } from "react-hook-form"
// SERVICES
import { save } from '@/services/UserServices';
// 
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from '@/components/ui/avatar'
const StoreUser = () => {
    const schema = yup.object({
        name: yup.string().min(1, 'Tên phải có ít nhất 1 ký tự').required('Vui lòng nhập tên người dùng'),
        email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
        password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
        // phone: yup.string()
        //     .matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa số')
        //     .mil-10, 'Số điện thoại tôí đl-10 số').required('Vui lòng nhập số điện thoại')
    })
    const methods = useForm({
        resolver: yupResolver(schema)
    });
    const { handleSubmit, formState: { errors } } = methods;
    const breadcrumb = [
        {
            title: 'Trang chủ',
            path: '/admin'
        },
        {
            title: 'Thêm người dùng',
            path: '/admin/users/store'
        },
    ];
    const { submitHandler, isLoading } = useFormSubmit(save);
    const id = useParams();
    const isEdit = !!id;
    useEffect(() => {
        isEdit
    }, [])
    return (
        <>
            <div className="flex flex-1 flex-col page-wrapper">
                <Heading
                    heading={headingConfig}
                    breadcrumb={breadcrumb}
                />
                <div className="page-container">
                    <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-5">
                            <CustomNotice />
                        </div>
                        <div className="col-span-7">
                            <CustomCard
                                openHeader={true}
                                title={"Thêm người dùng mới"}
                                desc={"Điền đầy đủ thông tin để tạo tài khoản người dùng"}
                                loading={false}>
                                <FormProvider {...methods}>
                                    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 max-w-md">
                                        <div className="grid grid-cols-1 gap-2">
                                            <div className="col-span-1">
                                                <CustomInput
                                                    name="name"
                                                    label="Tên người dùng"
                                                    required={true}
                                                />
                                            </div>
                                            <div className="col-span-5">
                                                <CustomInput
                                                    name="email"
                                                    label="Email"
                                                    type="email"
                                                    required={true}
                                                />
                                            </div>
                                            <div className="col-span-7">
                                                <CustomInput
                                                    name="password"
                                                    label="Mật khẩu"
                                                    type="password"
                                                    autoComplete="off"
                                                    required={true}
                                                />
                                            </div>
                                            <div>
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/shadcn.png" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                            </div>
                                        </div>
                                        <LoadingButton
                                            loading={isLoading}
                                            className={"bg-sky-600"}
                                            text="Lưu lại" />

                                    </form>
                                </FormProvider>
                            </CustomCard>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
export default StoreUser