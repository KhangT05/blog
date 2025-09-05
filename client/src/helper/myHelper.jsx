import { toast } from "react-toastify";
export const showToast = (type, message) => {
    if (message) {
        switch (type) {
            case 'success':
                toast.success(message);
                break;
            case 'warning':
                toast.warning(message);
                break;
            case 'error':
                toast.error(message);
                break;
            default:
                break;
        }
    }
}