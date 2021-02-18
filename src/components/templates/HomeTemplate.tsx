import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
// import FilterPanel from '../organisms/FilterPanel';
import { useQuery, useTabFromQuery } from '../../hooks/queryHooks';
import TabsTemplate from './TabsTemplate';
import { useStore } from '../../stores/storeConfig';
import ConfigFilterModal from '../organisms/ConfigFilterModal';
import ButtonShowFilterModal from '../atoms/ButtonShowFilterModal';
import { useMemos } from "../../hooks/myUseMemo";
import { toJS } from 'mobx';
import CasualtiesSumLabel from '../atoms/CasualtiesSumLabel';
import FilterForm from "../organisms/FilterForm";
import WithSidebarTemplate from './WithSidebarTemplate';

interface IProps { }
const HomeTemplate: React.FC<IProps> = observer(() => {
   const { t } = useTranslation();
   const { mapStore, filterStore, uiStore } = useStore();
   const { setIsMultipleCities, updateCities, submitFilter, } = filterStore;
   const { currentTab, setCurrentPage, setCurrentTab, showFilterModal } = uiStore;
   const reactMarkers = toJS(filterStore.dataAllInjuries);

   const history = useHistory();
   const location = useLocation();

   useEffect(() => {
      history.push({
         pathname: '/home',
         search: `?tab=${currentTab}`,
      });
   }, [currentTab, history]);

   useEffect(() => {
      setCurrentPage('home');
      const query = useQuery(location);
      const tab = useTabFromQuery(query, 'charts');
      setCurrentTab(tab);
      setIsMultipleCities(true);
   }, []);  // eslint-disable-line react-hooks/exhaustive-deps

   mapStore.isReadyToRenderMap = false;

   useEffect(() => {
      // mapStore.initBounds();
      updateCities([], false);
      submitFilter();
   }, [submitFilter, updateCities]);


   const memoConfigModal = useMemos([showFilterModal], <ConfigFilterModal />)


   return (
      <WithSidebarTemplate>
         {/* <div className="row"> */}
         <div>
            <h4 className="sub-title" style={{
               display: 'flex',
               justifyContent: 'space-between',
               marginTop: '0.7rem'
            }}>
               <span style={{ display: 'flex', fontSize: '1.25rem' }}>
                  {t('Israel')}&nbsp;
                        <CasualtiesSumLabel
                     length={reactMarkers.length}
                     name={filterStore.cityResult}
                  />
               </span>
               <ButtonShowFilterModal />
            </h4>
            {showFilterModal && memoConfigModal}
            <TabsTemplate type="home" />
         </div>
         {/* </div> */}
      </WithSidebarTemplate>
   );
});
export default HomeTemplate;
