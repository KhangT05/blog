import { Button } from "./ui/button"
const LoadingButton = ({ loading, text }) => {
    return (
        <Button className="" disabled={loading}>
            {loading ? "Đang lưu..." : text}
        </Button>
    )
}
export default LoadingButton