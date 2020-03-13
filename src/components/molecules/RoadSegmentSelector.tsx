
import React, {ChangeEvent} from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import Form from 'react-bootstrap/Form';

import { useStore } from '../../stores/storeConfig'


interface IProps {
    isMultiple?: boolean
}

export const RoadSegmentSelector: React.FC<IProps> = observer(({ isMultiple = false}) => {
    const store = useStore();
    const { t } = useTranslation();
    const {cities, roadSegment, updateRoadSegment} = store;
    if (cities.length === 0){
        return (
            <Form.Group controlId="exampleForm.ControlRoadSegment">
                <Form.Label className="filterLable">{t('RoadSegment')}:</Form.Label>
                <Form.Control type="input" placeholder="" value={roadSegment.toString()} onChange={(e:ChangeEvent<HTMLInputElement>) => {updateRoadSegment(e.target.value);}}/>
            </Form.Group>
       
        )
    }
    else return null;
})