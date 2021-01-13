import React, { ChangeEvent, FC, Fragment, useContext, useEffect, useState } from 'react';
import { ButtonGroup } from '@progress/kendo-react-buttons';
import { Label } from '@progress/kendo-react-labels';
import { Card, CardBody, CardImage } from '@progress/kendo-react-layout';
import { HardwareContext } from '../../../store/HardwareContext';
import { InputText } from '../../UI/InputText/InputText';
import { CustomButton } from '../../UI/CustomButton/CustomButton';
import { Spinner } from '../../UI/Spinner/Spinner';
import { ErrorMessage } from '../../UI/ErrorMessage/ErrorMessage';
import { InputTypes } from '../../../Enums/InputTypes';
import { HardwareInfo } from '../../../Enums/HardwareInfo';
import { IHardware } from '../../../models/HardwareModel';
import { hardwareInformation } from '../../../constants/hardware-types';
import { IHardwareItemProps } from './Types';
import './HardwareItem.scss';

export const HardwareItem: FC<IHardwareItemProps> = (props: IHardwareItemProps) => {
    let hardwareItemContent = null;

    const [editMode, setEditMode] = useState<boolean>(false);
    const [updatedHardware, setUpdatedHardare] = useState<IHardware>(props.hardware);

    const { hardwareState, updateHardwareByProjectName } = useContext(HardwareContext);

    useEffect(() => {
        setUpdatedHardare(props.hardware)
    }, [ props.hardware ]);
    
    const handleInputChanges = (event: ChangeEvent) => {
        const {name, value} = event.target as EventTarget as HTMLInputElement;
        setUpdatedHardare({...props.hardware, [name]: value});
    };

    const handleSubmitUpdatedHardware = () => {
        updateHardwareByProjectName!(updatedHardware, props.projectName!);
        setEditMode(false);
    };

    const handleCancelUpdatingHardware = () => {
        setUpdatedHardare(props.hardware);
        setEditMode(false);
    };

    if (!props.hardware) {
        return (
            <Fragment/>
        )
    }

    if (hardwareState.isLoading) {
        hardwareItemContent = <Spinner />;
    } else {
        hardwareItemContent =
            <div className='hardware__item'>
                <section className='hardware__item-info'>
                    <Card className='hardware__item-card'> 
                        {!editMode &&
                            <div className='hardware__checked'>
                                <CardImage src={props.hardware.Image}/>
                                <span>Checked</span>
                            </div>
                        }
                    </Card>
                    <Card className='hardware__item-body'>
                        <InputText name={HardwareInfo.Type} type={InputTypes.Dropdown} data={hardwareInformation.Types} editMode={editMode} currentValue={props.hardware.Type} updatedValue={updatedHardware.Type} changeHandler={handleInputChanges} />
                        <CardBody className='hardware__information'>
                            <div className='hardware__information-details'>
                                <h3>Basic information</h3>
                                
                                <Label>Model</Label>
                                <InputText name={HardwareInfo.Model} type={InputTypes.Input} editMode={editMode} currentValue={props.hardware.Model} updatedValue={updatedHardware.Model} changeHandler={handleInputChanges} />
                                
                                <div>
                                    <span>
                                        <Label>Serial Number</Label>
                                        <InputText name={HardwareInfo.SerialNumber} type={InputTypes.Input}  editMode={editMode} currentValue={props.hardware.SerialNumber} updatedValue={updatedHardware.SerialNumber} changeHandler={handleInputChanges} />
                                    </span>
                                    <span>
                                        <Label>Inventory Number</Label>
                                        <InputText name={HardwareInfo.InventoryNumber} type={InputTypes.Input}  editMode={editMode} currentValue={props.hardware.InventoryNumber} updatedValue={updatedHardware.InventoryNumber} changeHandler={handleInputChanges} />
                                    </span>
                                </div>
                            </div>
                            <div className='hardware__information-details'>
                                <h3>Hardware location</h3>
                                <Label>Location</Label>
                                <InputText name={HardwareInfo.Location} type={InputTypes.Dropdown} data={hardwareInformation.Location} editMode={editMode}  currentValue={props.hardware.Location} updatedValue={updatedHardware.Location} changeHandler={handleInputChanges}/>
                                <div>
                                    <span className='details__floor-room'>
                                        <span>
                                            <Label>Floor</Label>
                                            <InputText name={HardwareInfo.Floor} type={InputTypes.Input} editMode={editMode} currentValue={props.hardware.Floor} updatedValue={updatedHardware.Floor} changeHandler={handleInputChanges} />
                                        </span>
                                        <span>
                                            <Label>Room</Label>
                                            <InputText name={HardwareInfo.Room} type={InputTypes.Input} editMode={editMode} currentValue={props.hardware.Room} updatedValue={updatedHardware.Room} changeHandler={handleInputChanges} />
                                        </span>
                                    </span>
                                    <span className='details__place-number'>
                                        <Label>Place Number</Label>
                                        <InputText name={HardwareInfo.PlaceNumber} type={InputTypes.Input} editMode={editMode} currentValue={props.hardware.PlaceNumber} updatedValue={updatedHardware.PlaceNumber} changeHandler={handleInputChanges} />
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                            <div className='hardware__comment'>
                                <Label>Commets</Label>
                                <InputText name={HardwareInfo.Comment} type={InputTypes.Textarea} editMode={editMode} currentValue={props.hardware.Comment} updatedValue={updatedHardware.Comment} changeHandler={handleInputChanges} />
                            </div>
                    </Card>
                </section>

                <section className='hardware__item-options'>
                    {!editMode &&
                        <ButtonGroup >
                            <CustomButton icon="check" text="Yes, it's mine"/>
                            <CustomButton icon="pencil" buttonEvent={() => setEditMode(true)} text="Yes, with changes" />
                            <CustomButton icon="cancel" buttonEvent={() => props.deleteHardwareAction(props.hardware.SerialNumber)} text="No, it's not mine" />
                        </ButtonGroup>
                    }
                    {editMode &&
                        <ButtonGroup >
                            <CustomButton buttonEvent={() => handleSubmitUpdatedHardware()} text="Save" />
                            <CustomButton buttonEvent={() => handleCancelUpdatingHardware()} text="Cancel" />
                        </ButtonGroup>
                    }
                </section>
            </div>
    }

    return (
        <Fragment>
            {!hardwareState.error &&
                hardwareItemContent
            }
            {hardwareState.error &&
                <ErrorMessage text={hardwareState.error} />
            }
        </Fragment>
    )
};

export {}