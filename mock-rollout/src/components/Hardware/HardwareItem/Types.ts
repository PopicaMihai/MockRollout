import { IHardware } from '../../../models/HardwareModel';

export interface IHardwareItemProps {
    hardware: IHardware;
    deleteHardwareAction: (serialNumber: string) => void;
    projectName: string;
}