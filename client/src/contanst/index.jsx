import { CircleGauge, Settings, User } from "lucide-react";

export const index = [
    {
        label: 'Bảng điều khiển',
        icons: <CircleGauge />,
        path: '/admin/home'
    },
    {
        label: 'Quản lý người dùng ',
        icons: <User />,
        children: [
            {
                title: 'Danh sách người dùng',
                path: '/admin/users/index'
            },
            {
                title: 'Thêm người dùng',
                path: '/admin/users/store'
            },
        ]
    },
    {
        label: 'Cài đặt hệ thống',
        icons: <Settings />,
        children: [
            {
                title: 'Cài đặt chung',
                path: '/admin/settings'
            },
            {
                title: 'Cài đặt bảo mật',
                path: '/admin/settings/security'
            },
        ]
    }
];
// {
//     label: 'Quản lý bài viết',
//     active: ['posts'],
//     icons: <User />,
//     children: [
//         {
//             title: 'Danh sách bài viết',
//             path: '/admin/posts/index'
//         },
//         {
//             title: 'Thêm bài viết',
//             path: '/admin/posts/store'
//         },
//     ]
// },
// {
//     label: 'Quản lý danh mục',
//     active: ['categories'],
//     icons: "",
//     children: [
//         {
//             title: 'Danh sách danh mục',
//             path: '/admin/categories/index'
//         },
//         {
//             title: 'Thêm danh mục',
//             path: '/admin/categories/store'
//         },
//     ]
// },