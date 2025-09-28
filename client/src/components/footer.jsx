import useTable from "@/hooks/useTable"
import { pagination } from "@/services/SettingServices"
import { useEffect } from "react"
const Footer = () => {
    const models = 'settings';
    const { data, isLoading, isError } = useTable({
        models,
        pagination
    });

    return (
        <footer>
            <div>
                {
                    isLoading ? (
                        <></>
                    ) : isError ? (
                        <></>
                    ) : (

                        (data?.[models] ?? []).length > 0 ? (
                            <ul>
                                {
                                    data[models].map((row, index) => (
                                        <li key={index}> {row.site_name} </li>
                                    ))
                                }
                            </ul>
                        ) : (
                            <span>Không có dữ liệu phù hợp để hiển thị.</span>
                        )
                    )
                }
            </div>
        </footer>
    )
}
export default Footer