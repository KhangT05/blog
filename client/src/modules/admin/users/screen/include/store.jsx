import Heading from "@/components/heading"
import CustomInput from "@/components/customInput"
import CustomCard from "@/components/customCard"
import CustomToolbar from "@/components/customToolbar"
import CustomNotice from "@/components/customNotice"
const StoreUser = () => {
    // const breadcrumbData = breadcrumb.create
    return (
        <>
            Tao ds nguoi dung
            {/* <Heading breadcrumb={breadcrumbData} /> */}
            <div className="flex">
                <div className="">
                    <CustomNotice />
                </div>
                <CustomCard
                    openHeader={true}
                    title={"abc"}
                    desc={"abc"}
                    loading={false}>
                    <CustomToolbar />
                </CustomCard>
            </div>
        </>
    )
}
export default StoreUser