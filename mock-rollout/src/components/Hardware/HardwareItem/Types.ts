import { IHardware } from '../../../models/HardwareModel';

export interface IHardwareItemProps {
    hardware: IHardware;
    deleteHardwareProps: (serialNumber: string) => void;
}