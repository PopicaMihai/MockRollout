export interface IEditTextProps {
    editMode: boolean;
    currentHardware: string;
    updatedHardware: string;
    changeHandler: (event: any) => void;
    name: string;
} 