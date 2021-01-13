import { IHardware } from './HardwareModel';

export interface IProject {
    name: string;
    projectOwner: string;
    description: string;
    hardwares: IHardware[];
}