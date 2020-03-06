import React from 'react'
import { useLocation } from 'react-router-dom'
//import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import {TabsTemplate} from './TabsTemplate'
import { FilterPanel } from '../organisms/FilterPanel'
import { useStore } from '../../stores/storeConfig'
import citisNamesHeb from "../../assets/cities_names_heb.json";


interface IProps { }

export const CityTemplate: React.FC<IProps> = observer(() => {
  //const { t } = useTranslation();
  const store = useStore();
  store.isMultipleCities = false;
  const { cityResult } = store;
  if (cityResult === "") {
    let cityName = useCityNamefromQuery();
    store.updateCities(cityName);
    store.submitFilter();
  }
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row ">
          <div className="p-2 col-md-2"><FilterPanel /></div>
          <div className="col-md-10">
              <h4>{cityResult}</h4>
              <TabsTemplate defaultKey="map"/>
          </div>
        </div>
      </div>
    </div>
  )
})

//get city name by query by url
function useCityNamefromQuery() {
  let query = useQuery();
  let res = ["תל אביב -יפו"];
  let name = query.get("name")
  let found = false;
  if (name !== null)
    found = citisNamesHeb.includes(name);
  if (found) {
    res = [citisNamesHeb.find(element => element === name!)!];
  }
  return res;
}
// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}


