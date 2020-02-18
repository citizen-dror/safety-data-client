
import React from 'react'
import { toJS } from 'mobx'
import { observer } from "mobx-react"
import { useStore } from '../stores/storeConfig'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'

export const AccidentsTable = observer(() => {
    const store = useStore();
    const reactMarkers = toJS(store.markers)
    const columns = [{
        dataField: '_id',
        text: 'ID'
    }, {
        dataField: 'accident_year',
        text: 'Year'
    }, {
        dataField: 'age_group_hebrew',
        text: 'Age'
    }, {
        dataField: 'sex_hebrew',
        text: 'Gender'
    }];
    if (reactMarkers.length >0 ){
        return (<div>
             <p>`Found {reactMarkers.length} Accidesnt:`</p>
            <BootstrapTable keyField='id' data={reactMarkers} columns={columns} />
            </div>
            )
    }
    else return null;
})
