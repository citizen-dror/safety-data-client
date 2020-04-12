import React, { useState, FunctionComponent, lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { ErrorBoundary } from '../atoms/ErrorBoundary'
//import MapAccidents from '../organisms/MapAccidents'
//import AccidentsTable from '../organisms/AccidentsTable'
//import GroupByGraphsPanel from '../organisms/GroupByGraphsPanel'
import { GroupByTablesPanel } from '../organisms/GroupByTablesPanel'
import { useStore } from '../../stores/storeConfig'

interface IProps {
    defaultKey?: string
}

const GroupByGraphsPanel = lazy(() => import('../organisms/GroupByGraphsPanel'));
const MapAccidents = lazy(() => import('../organisms/MapAccidents'));
const AccidentsTable = lazy(() => import('../organisms/AccidentsTable'));
export const TabsTemplate: FunctionComponent<IProps> = observer(({ defaultKey = "charts" }) => {
    const style = {
        marginTop: "20px"
    }
    const { t } = useTranslation();
    const [activeKey] = useState(defaultKey);
    const { mapStore } = useStore();
    return (
        <Tabs defaultActiveKey={activeKey} id="main-tabs"
            onSelect={(activeKey: any) => {
                if (activeKey === "map") {
                    //map is renderd only when tab is shown to prevent leaflet bug
                    mapStore.isReadyToRenderMap = true;
                }
                else
                    mapStore.isReadyToRenderMap = false;
            }}
        >
            <Tab style={style} eventKey="charts" title={t("Charts")}>
                <ErrorBoundary>
                 <Suspense fallback={<div>Loading Charts...</div>}>
                    <GroupByGraphsPanel />
                    </Suspense>
                </ErrorBoundary>
            </Tab>
            <Tab style={style} eventKey="grouptables" title={t("Groups")}>
                <ErrorBoundary>
                    <GroupByTablesPanel />
                </ErrorBoundary>
            </Tab>
            <Tab style={style} eventKey="map" title={t("Map")}>
                <ErrorBoundary>
                    <Suspense fallback={<div>Loading Map...</div>}>
                        <MapAccidents />
                    </Suspense>
                </ErrorBoundary>
            </Tab>
            <Tab style={style} eventKey="table" title={t("Table")}>
                <ErrorBoundary>
                    <Suspense fallback={<div>Loading Accidents Table...</div>}>
                        <div className="col-auto"><AccidentsTable /></div>
                    </Suspense>
                </ErrorBoundary>
            </Tab>
        </Tabs>
    )
})
export default TabsTemplate 