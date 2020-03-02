import React from 'react'
import { useLocation } from 'react-router-dom'
import { observer } from "mobx-react"
import Card from 'react-bootstrap/Card';
import MapAccidents from '../organisms/MapAccidents'
import { FilterPanel } from '../organisms/FilterPanel'
import { AggregatesPanel } from '../organisms/AggregatesPanel'
import { AccidentsTable } from '../organisms/AccidentsTable'
import { useStore } from '../../stores/storeConfig'
import citisNamesHeb from "../../assets/cities_names_heb.json";

interface IProps { }

export const CityTemplate: React.FC<IProps> = observer(() => {
  const store = useStore();
  const { cityResult } = store;
  if (cityResult === "") {
    let cityName = useCityNamefromQuery();
    store.updateCity(cityName);
    store.submitFilter();
  }
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row ">
          <div className="p-2 col-md-2"><FilterPanel /></div>
          <div className="col-md-10">
            <div className="row">
              <h4>{cityResult}</h4>
            </div>
            <AggregatesPanel />
            <Card><MapAccidents name="" /></Card>
            <div className="row">
              <div className="col-auto"><AccidentsTable /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

//get city name by query by url
function useCityNamefromQuery() {
  let query = useQuery();
  let res = "תל אביב -יפו";
  let name = query.get("name")
  let found = false;
  if (name !== null)
    found = citisNamesHeb.includes(name);
  if (found) {
    res = citisNamesHeb.find(element => element === name!)!;
  }
  return res;
}
// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}


