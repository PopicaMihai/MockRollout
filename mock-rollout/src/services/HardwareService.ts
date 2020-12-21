import { IHardware } from '../model/HardwareModel';
import { ApiContext } from '../store/ApiContext';

export class HardwareService {
    static getHardware() {
        try {
            return ApiContext.getHardware();
        }
        catch {
            throw new Error('Server Error on getting the date');
        }
    };

    static editHardware(id: number, hardware: IHardware) {
        try {
            return ApiContext.updateHardware(id, hardware);
        }
        catch {
            throw new Error('Server error on uploading the array')
        }
    }
}