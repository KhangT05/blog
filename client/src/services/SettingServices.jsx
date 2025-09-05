import api from '@/config/axios';
import { showToast } from '@/helper/myHelper';
export const listSetting = async () => {
    const response = await api.get('/setting/list');
    return response.data
}
