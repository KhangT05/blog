import useTable from "@/hooks/useTable"
import { listUsers } from "@/services/UserServices"
import Pagiante from "@/components/Paginate";
const SangTac = () => {
    const models = 'users';
    const pagination = async (queryString) => {
        return await listUsers(queryString);
    }
    const { data, isError, isLoading, refetch } = useTable({ models, pagination });
    return (
        <>

        </>
    )
}

export default SangTac