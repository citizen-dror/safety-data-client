import React from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import { FilterPanel } from '../organisms/FilterPanel'
import {TabsTemplate} from './TabsTemplate'
import { useStore } from '../../stores/storeConfig'

interface IProps { }

export const HomeTemplate: React.FC<IProps> = observer(() => {
  const { t } = useTranslation();
  const store = useStore();
  store.isMultipleCities = true;
  store.isReadyToRenderMap = false;
  store.updateCities([]);
  store.submitFilter();
  return (
    <div className="App">
    <div className="container-fluid">
      <div className="row ">
        <div className="p-2 col-md-2"><FilterPanel /></div>
        <div className="col-md-10">
            <h4>{t("Israel")}</h4>
           <TabsTemplate/>
        </div>
      </div>
    </div>
  </div>
  )
})

// const handleTabSelect= () =>{

// }