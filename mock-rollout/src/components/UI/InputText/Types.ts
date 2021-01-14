import { HardwareInfo } from "../../../Enums/HardwareInfo";
import { InputTypes } from "../../../Enums/InputTypes";

export interface IEditTextProps {
    editMode: boolean;
    currentValue: string;
    updatedValue?: string;
    changeHandler: (event: any) => void;
    name: HardwareInfo | string;
    type: InputTypes;
    data?: string[];
}