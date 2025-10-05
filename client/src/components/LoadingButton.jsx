import { Button } from "./ui/button"
const LoadingButton = ({ loading, text, className }) => {
    return (
        <Button className={`${className ?? 'hover:bg-sky-400/65 mr-10'}  `} disabled={loading}>
            {loading ? "Đang lưu..." : text}
        </Button>
    )
}
export default LoadingButton