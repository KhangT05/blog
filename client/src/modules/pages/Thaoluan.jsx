import useTable from "@/hooks/useTable"
import Pagiante from "@/components/customPagination";
const Thaoluan = () => {
    const models = 'users';
    const pagination = async (queryString) => {
        return await listUsers(queryString);
    }
    const { data, isError, isLoading, refetch } = useTable({ models, pagination });
    return (
        <>
            thao luaanj
        </>
    )
}

export default Thaoluan