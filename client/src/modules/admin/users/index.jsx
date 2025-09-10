import { listUsers } from "@/services/UserServices"
import useTable from '@/hooks/useTable'
const Users = () => {
    const models = 'users';
    const pagination = async () => {
        return await listUsers();
    }

    const { data, isLoading, refetch, isError } = useTable({ models, pagination })

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading users</div>;

    return (
        <>
            <div>
                {Array.isArray(data) ? (
                    data.map(user => (
                        <div key={user.id}>{user.name}</div>
                    ))
                ) : (
                    <div>No users found</div>
                )}
            </div>
        </>
    )
}
export default Users