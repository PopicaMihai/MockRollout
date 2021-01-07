import React, { ChangeEvent, FC, Fragment, useContext, useEffect, useState } from 'react'
import { IHardware } from '../../../models/HardwareModel';
import './HardwareItem.scss';
import { ButtonGroup } from '@progress/kendo-react-buttons';
import { Label } from '@progress/kendo-react-labels';
import { Card, CardBody, CardImage } from '@progress/kendo-react-layout';
import { IHardwareItemProps } from './Types';
import { HardwareContext } from '../../../store/HardwareContext';
import { InputText } from '../../UI/InputText/InputText';
import { CustomButton } from '../../UI/CustomButton/CustomButton';
import { InputTypes } from '../../../Enums/InputTypes';
import { HardwareInfo } from '../../../Enums/HardwareInfo';
import { hardwareInformation } from '../../../constants/hardware-types';

export const HardwareItem: FC<IHardwareItemProps> = ({hardware, deleteHardwareProps}) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [updatedHardware, setUpdatedHardare] = useState<IHardware>(hardware);

    const hardwareContext = useContext(HardwareContext);

    useEffect(() => {
        setUpdatedHardare(hardware)
    }, [ hardware ]);
    
    const handleInputChanges = (event: ChangeEvent) => {
        const {name, value} = event.target as EventTarget as HTMLInputElement;
        setUpdatedHardare({...hardware, [name]: value});
    };

    const handleSubmit = () => {
        hardwareContext.updateHardware!(updatedHardware);
        setEditMode(false);
    };

    const handleCancel = () => {
        setUpdatedHardare(hardware);
        setEditMode(false);
    };

    if (!hardware) {
        return (
            <Fragment/>
        )
    }

    return (
        <Fragment>
            <div className='hardware__item'>
                <section className='hardware__item-info'>
                    <Card className='hardware__item-card'> 
                        {!editMode &&
                            <div className='hardware__checked'>
                                <CardImage src={hardware.Image}/>
                                <span>Checked</span>
                            </div>
                        }
                    </Card>
                    <Card className='hardware__item-body'>
                        <InputText name={HardwareInfo.Type} type={InputTypes.Dropdown} data={hardwareInformation.Types} editMode={editMode} currentValue={hardware.Type} updatedValue={updatedHardware.Type} changeHandler={handleInputChanges} />
                        <CardBody className='hardware__information'>
                            <div className='hardware__information-details'>
                                <h3>Basic information</h3>
                                
                                <Label>Model</Label>
                                <InputText name={HardwareInfo.Model} type={InputTypes.Input} editMode={editMode} currentValue={hardware.Model} updatedValue={updatedHardware.Model} changeHandler={handleInputChanges} />
                                
                                <div>
                                    <span>
                                        <Label>Serial Number</Label>
                                        <InputText name={HardwareInfo.SerialNumber} type={InputTypes.Input}  editMode={editMode} currentValue={hardware.SerialNumber} updatedValue={updatedHardware.SerialNumber} changeHandler={handleInputChanges} />
                                    </span>
                                    <span>
                                        <Label>Inventory Number</Label>
                                        <InputText name={HardwareInfo.InventoryNumber} type={InputTypes.Input}  editMode={editMode} currentValue={hardware.InventoryNumber} updatedValue={updatedHardware.InventoryNumber} changeHandler={handleInputChanges} />
                                    </span>
                                </div>
                            </div>
                            <div className='hardware__information-details'>
                                <h3>Hardware location</h3>
                                <Label>Location</Label>
                                <InputText name={HardwareInfo.Location} type={InputTypes.Dropdown} data={hardwareInformation.Location} editMode={editMode}  currentValue={hardware.Location} updatedValue={updatedHardware.Location} changeHandler={handleInputChanges}/>
                                <div>
                                    <span className='details__floor-room'>
                                        <span>
                                            <Label>Floor</Label>
                                            <InputText name={HardwareInfo.Floor} type={InputTypes.Input} editMode={editMode} currentValue={hardware.Floor} updatedValue={updatedHardware.Floor} changeHandler={handleInputChanges} />
                                        </span>
                                        <span>
                                            <Label>Room</Label>
                                            <InputText name={HardwareInfo.Room} type={InputTypes.Input} editMode={editMode} currentValue={hardware.Room} updatedValue={updatedHardware.Room} changeHandler={handleInputChanges} />
                                        </span>
                                    </span>
                                    <span className='details__place-number'>
                                        <Label>Place Number</Label>
                                        <InputText name={HardwareInfo.PlaceNumber} type={InputTypes.Input} editMode={editMode} currentValue={hardware.PlaceNumber} updatedValue={updatedHardware.PlaceNumber} changeHandler={handleInputChanges} />
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                            <div className='hardware__comment'>
                                <Label>Commets</Label>
                                <InputText name={HardwareInfo.Comment} type={InputTypes.Textarea} editMode={editMode} currentValue={hardware.Comment} updatedValue={updatedHardware.Comment} changeHandler={handleInputChanges} />
                            </div>
                    </Card>
                </section>

                <section className='hardware__item-options'>
                    {!editMode &&
                        <ButtonGroup >
                            <CustomButton icon="check" text="Yes, it's mine"/>
                            <CustomButton icon="pencil" buttonEvent={() => setEditMode(true)} text="Yes, with changes" />
                            <CustomButton icon="cancel" buttonEvent={() => deleteHardwareProps(hardware.SerialNumber)} text="No, it's not mine" />
                        </ButtonGroup>
                    }
                    {editMode &&
                        <ButtonGroup >
                            <CustomButton buttonEvent={() => handleSubmit()} text="Save" />
                            <CustomButton buttonEvent={() => handleCancel()} text="Cancel" />
                        </ButtonGroup>
                    }
                </section>
            </div>
        </Fragment>
    )
};