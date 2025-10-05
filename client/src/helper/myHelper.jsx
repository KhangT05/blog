import { toast } from "sonner";
export const showToast = (type, message) => {
    if (message) {
        switch (type) {
            case 'success':
                toast.success(type, {
                    description: message
                });
                break;
            case 'warning':
                toast.warning(type, {
                    description: message
                });
                break;
            case 'error':
                toast.error(type, {
                    description: message
                });
                break;
            case 'info':
                toast.info(type, {
                    description: message
                });
            default:
                break;
        }
    }
}