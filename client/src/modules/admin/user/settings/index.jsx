import { Trash, FilePenLine } from "lucide-react";
import { formatDatetime } from "@/contanst/general";
// export const breadcrumb = [
//     {
//         title: 'Quản lý người dùng',
//         path: '/admin/users'
//     },
//     {
//         title: 'Thêm người dùng',
//         path: '/admin/users/create'
//     },
//     {
//         title: 'Cập nhật người dùng',
//         path: '/admin/users/update'
//     }
// ]
export const headingConfig = "Quản lý người dùng"
export const models = 'users';
export const tableColumn = [
    {
        name: 'STT',
        render: (item) => <span> {item.id} </span>
    },
    {
        name: 'Tên người dùng',
        render: (item) => <span> {item.name} </span>
    },
    {
        name: 'Email',
        render: (item) => <span> {item.email} </span>
    },
    {
        name: 'Ngày tạo',
        render: (item) => <span>{formatDatetime(item.created_at)}</span>
    },
    {
        name: 'Ngày cập nhật',
        render: (item) => <span>{formatDatetime(item.updated_at)}</span>
    }
]
export const buttonActions = [
    {
        icon: <FilePenLine />,
        className: '',
        method: 'update',
        onClick: (id, name, openSheet) => {
            openSheet({ open: true, action: 'update', id: id })
        }
    },
    {
        icon: <Trash />,
        className: '',
        method: 'delete',
        onClick: (id, destroy, handleDelete) => {
            handleDelete(id, destroy)
        }
    }
]