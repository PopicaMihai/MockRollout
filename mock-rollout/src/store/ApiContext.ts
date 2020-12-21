import axios from 'axios';
import { ENDPOINTS } from '../constants/api-endpoint';
import { IHardware } from '../model/HardwareModel';

export class ApiContext {
    public static async getHardware(): Promise<IHardware[]> {
        const response = await axios.get<IHardware[]>(ENDPOINTS.GET_HARDWARE);
        return response.data;
    };

    public static async updateHardware(id: number, hardware: IHardware): Promise<void> {
        await axios.put<IHardware>(`${ENDPOINTS.GET_HARDWARE}/${id}`, { data: hardware });
        
    }
}