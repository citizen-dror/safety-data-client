import React , {FunctionComponent} from 'react'
import { observer } from "mobx-react"
import { toJS } from 'mobx'

//import L from 'leaflet'
import { Map, TileLayer} from 'react-leaflet'
import AccidentsMarkers from '../molecules/AccidentsMarkers'
import { useStore } from '../../stores/storeConfig'
import 'leaflet-css'

interface IProps {
  name:string
}
const MapAccidents:FunctionComponent<IProps> = observer(({ name }) => {
  const store = useStore();
  const reactMapCenter = toJS(store.mapCenter);
  const WRAPPER_STYLES = { height: '500px', width: '100vw', maxWidth: '100%' };
  return (
    <div>
      <Map
        center={reactMapCenter}
        zoom={13}
        style={WRAPPER_STYLES}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AccidentsMarkers />
      </Map>
    </div>
  )
})



/* const  getPoints =(e) =>{
    var service = new  AccidentService ();
    service.getAll(this.addPointsToMap);
  }

  const addPointsToMap=(arrPoints) =>{
    this.setState(() => {
      return {markers: arrPoints};
    })
  } */

export default MapAccidents