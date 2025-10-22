
export const filters = [
    {
        key: 'status',
        placeholder: 'Chọn trạng thái',
        defaultValue: '0',
        option: [
            {
                label: 'Chọn tất cả',
                value: '0'
            },
            {
                label: 'Hoạt động',
                value: '1'
            },
            {
                label: 'Không Hoạt động',
                value: '2'
            }
        ]
    },
    {
        key: 'perpage',
        placeholder: 'Chọn trạng thái',
        defaultValue: '10',
        option: ['10', '20', '40', '60', '80', '100'].map((item) => ({
            label: `${item} bản ghi`,
            value: `${item}`
        }))
    }
]