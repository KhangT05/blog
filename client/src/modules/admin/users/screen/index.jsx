// SERVICES
import { listUsers } from "@/services/UserServices"
// CUSTOMIZE FORM
import useTable from '@/hooks/useTable'
import Paginate from "@/components/Paginate"
import CustomTable from "@/components/customTable"
// 
import { breadcrumb } from '../settings/index'
const Users = ({ }) => {
    const models = 'users';
    const pagination = async (queryString) => {
        return await listUsers(queryString);
    }
    const BreadcrumbData = breadcrumb.index
    const { data, isLoading, refetch, isError, isPage, handlePageChange } = useTable({
        models,
        pagination
    });
    return (
        <>
        </>
    )
}

export default Users