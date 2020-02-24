import React from 'react'
import { observer } from "mobx-react"
import { useStore } from '../stores/storeConfig'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import 'leaflet-css'
import redMarker from '../assets/marker-icon-2x-red.png'
import shadoMarker from '../assets/marker-shadow.png'
import { toJS } from 'mobx'


const redIcon = new L.Icon({
  iconUrl: redMarker,
  shadowUrl: shadoMarker,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapAccidents = observer(() => {
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
      {/* <button className="button" type="button" onClick={this.getPoints.bind()} >Get Accidents</button> */}

    </div>
  )
})

const AccidentsMarkers = observer(() => {
  const store = useStore();
  const reactMarkers = toJS(store.markers);
  //console.log(reactMarkers);
  const markersArr = reactMarkers.map((x) => {
    if (x.latitude !== null && x.longitude !== null) {
      let lPoint: L.LatLng = new L.LatLng(x.latitude, x.longitude);
      return (<Marker key={`marker-${x._id}`} position={lPoint} icon={redIcon}>
        {<Popup>
          <div>
            <div>{x.accident_timestamp}</div>
            <div> {x.injured_type_hebrew},{x.sex_hebrew},{x.age_group_hebrew}</div>
            <div>{x.accident_yishuv_name}, {x.street1_hebrew}, {x.road_type_hebrew}</div>
          </div>
        </Popup>}
      </Marker>)
    }
    else { return null }
  })
  if (reactMarkers.length > 0) {
    return (
      <div>
        {markersArr}
      </div>
    )
  }
  else { return null }
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