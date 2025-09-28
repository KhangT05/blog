// SERVICES
import { pagination, destroy } from '@/services/UserServices'
// COMPONENTS
import useTable from '@/hooks/useTable'
import Paginate from "@/components/Paginate"
import CustomTable from "@/components/customTable"
import Heading from "@/components/heading"
import CustomToolbar from '@/components/customToolbar'
// SETTINGS
import { tableColumn, models, buttonActions, headingConfig } from '../settings/index'
import CustomCard from '@/components/customCard'
const Users = ({ }) => {
    const breadcrumb = [
        {
            title: 'Trang chủ',
            path: '/admin'
        },
        {
            title: 'Quản lý người dùng',
            path: '/admin/users/index'
        },
    ];
    const { data, isLoading, refetch, isError, handlePageChange } = useTable({
        models,
        pagination
    });
    return (
        <>
            <Heading
                heading={headingConfig}
                breadcrumb={breadcrumb}
            />
            <div className='container'>
                <CustomCard
                    openHeader={true}
                    title={headingConfig}
                    loading={false}
                    desc={'Bang'}
                    openFooter={true}
                >
                    <div>
                        <CustomTable
                            isLoading={isLoading}
                            isError={isError}
                            tableColumn={tableColumn}
                            data={data}
                            models={models}
                            refetch={refetch}
                            destroy={destroy}
                            buttonActions={buttonActions}
                        />
                    </div>
                    {
                        data?.pagination && data[models] ? (
                            <Paginate pagination={data.pagination}
                                pageChange={handlePageChange}
                            />
                        ) : null
                    }
                </CustomCard>
            </div>
        </>
    )
}

export default Users