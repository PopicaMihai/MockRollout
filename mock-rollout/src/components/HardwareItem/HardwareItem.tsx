import React, { FC, Fragment, useContext, useState } from 'react'
import { IHardware } from '../../model/HardwareModel';
import './HardwareItem.scss';
import { EditInputText } from '../EditTextInput/EditTextInput';
import { EditTextArea } from '../EditTextArea/EditTextArea';
import { EditTextDropdown} from '../EditTextDropdown/EditTextDropdown';
import { Button, ButtonGroup } from '@progress/kendo-react-buttons';
import { Label } from '@progress/kendo-react-labels';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Card, CardBody, CardImage } from '@progress/kendo-react-layout';
import { IHardwareItemProps} from './Types/HardwareItemProps';
import { HardwareContext } from '../../store/HardwareContext';

export const HardwareItem: FC<IHardwareItemProps> = ({hardware, index}) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [currentHardware, setCurrentHardware] = useState<IHardware>(hardware);
    const [updateHardware, setUpdateHardare] = useState<IHardware>(currentHardware);

    const hardwareContext = useContext(HardwareContext);
    

    const handleInputChanges = (event: any) => {
        const {name, value} = event.target;
        setUpdateHardare({...currentHardware, [name]: value});
    }

    const handleSubmit = () => {
        setCurrentHardware(updateHardware);
        hardwareContext.updateHardware!(index, updateHardware);
        console.log(index);
        console.log(updateHardware);
        setEditMode(false);
    }

    const handleCancel = () => {
        setUpdateHardare(currentHardware);
        setEditMode(false);
    }
    
    return (
        <Fragment>
            <div className='hardware__item'>
                <section className='hardware__item-info'>
                    <Card style={{ width: 250 }} >
                        {!editMode &&
                            <div className='hardware__checked'>
                                <CardImage src={currentHardware.Image}/>
                                <span>Checked</span>
                            </div>
                        }
                    </Card>
                    <Card style={{ width: 900 }}>
                        <EditTextDropdown name='Type' editMode={editMode} currentHardware={currentHardware.Type} updatedHardware={updateHardware.Type} changeHandler={handleInputChanges} />
                        <CardBody className='hardware__information'>
                            <div className='hardware__information-details'>
                                <h3>Basic information</h3>
                                
                                <Label>Model</Label>
                                <EditInputText name='Model' editMode={editMode} currentHardware={currentHardware.Model} updatedHardware={updateHardware.Model} changeHandler={handleInputChanges} />
                                
                                <div>
                                    <span>
                                        <Label>Serial Number</Label>
                                        <EditInputText name='SerialNumber' editMode={editMode} currentHardware={currentHardware.SerialNumber} updatedHardware={updateHardware.SerialNumber} changeHandler={handleInputChanges} />
                                    </span>
                                    <span>
                                        <Label>Inventory Number</Label>
                                        <EditInputText name='InventoryNumber' editMode={editMode} currentHardware={currentHardware.InventoryNumber} updatedHardware={updateHardware.InventoryNumber} changeHandler={handleInputChanges} />
                                    </span>
                                </div>
                            </div>
                            <div className='hardware__information-details'>
                                <h3>Hardware location</h3>
                                <Label>Location</Label>
                                <DropDownList style={{display: 'block'}} defaultItem={updateHardware.Location} name='Location' onChange={handleInputChanges}/>
                                <div>
                                    <span className='details__floor-room'>
                                        <span>
                                            <Label>Floor</Label>
                                            <EditInputText name='Floor' editMode={editMode} currentHardware={currentHardware.Floor} updatedHardware={updateHardware.Floor} changeHandler={handleInputChanges} />
                                        </span>
                                        <span>
                                            <Label>Room</Label>
                                            <EditInputText name='Room' editMode={editMode} currentHardware={currentHardware.Room} updatedHardware={updateHardware.Room} changeHandler={handleInputChanges} />
                                        </span>
                                    </span>
                                    <span className='details__place-number'>
                                        <Label>Place Number</Label>
                                        <EditInputText name='PlaceNumber' editMode={editMode} currentHardware={currentHardware.PlaceNumber} updatedHardware={updateHardware.PlaceNumber} changeHandler={handleInputChanges} />
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                            <div className='hardware__comment'>
                                <Label>Commets</Label>
                                <EditTextArea name='PlaceNumber' editMode={editMode} currentHardware={currentHardware.PlaceNumber} updatedHardware={updateHardware.PlaceNumber} changeHandler={handleInputChanges} />
                            </div>
                    </Card>
                </section>

                <section className='hardware__item-options'>
                    {!editMode &&
                        <ButtonGroup >
                            <Button togglable={true} icon="check">Yes, it's mine</Button>
                            <Button togglable={true} icon="pencil" onClick={() => setEditMode(true)}>Yes, with changes</Button>
                            <Button togglable={true} icon="cancel">No, it's not mine</Button>
                        </ButtonGroup>
                    }
                    {editMode &&
                        <ButtonGroup >
                            <Button togglable={true} onClick={() => handleSubmit()}>Save</Button>
                            <Button togglable={true} onClick={() => handleCancel()}>Cancel</Button>
                        </ButtonGroup>
                    }
                </section>
            </div>
        </Fragment>
    )
}