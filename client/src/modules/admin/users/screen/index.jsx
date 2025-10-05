// SERVICES
import { pagination, destroy } from '@/services/UserServices'
// COMPONENTS
import useTable from '@/hooks/useTable'
import CustomPagination from "@/components/customPagination"
import CustomTable from "@/components/customTable"
import Heading from "@/components/heading"
import CustomFilter from '@/components/customFilter'
import CustomCard from '@/components/customCard'
// SETTINGS
import { tableColumn, models, buttonActions, headingConfig } from '../settings/index'
import { filters } from '@/contanst/general'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { CirclePlus } from 'lucide-react'
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
                    desc={'Bang'}
                >
                    <div className='flex justify-between'>
                        <CustomFilter filters={filters} models={models} />
                        <Link to={''}>
                            <Button>
                                Thêm mới bản ghi
                                <CirclePlus />
                            </Button>
                        </Link>
                    </div>
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
                            <CustomPagination pagination={data.pagination}
                                pageChange={handlePageChange}
                            />
                        ) : null
                    }
                </CustomCard>
            </div >
        </>
    )
}
export default Users