import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import { toJS } from 'mobx'
import { useStore } from '../../stores/storeConfig'
import { SmallCard } from '../atoms/SmallCard'
import { SelectGroupBy } from '../atoms/SelectGroupBy'
import { SelectGroupBy2 } from '../atoms/SelectGroupBy2'
// import { RangeSlider } from '../atoms/RangeSlider'
import MyBarChart from '../molecules/MyBarChart'

interface IProps { }
const getSize = (width: number) => {
    let size: number = 500;
    if (width <= 350)
        size = 300;
    else if (width <= 760)
        size = width * 0.85;
    else if (width <= 1500)
        size = width * 0.75;
    else
        size = 1200;
    return size;
}

export const GroupByGraphsPanel: React.FC<IProps> = observer(() => {
    const { t } = useTranslation();
    const [graphSize, setGraphSize] = useState(getSize(window.innerWidth));
    const style = {
        marginLeft: "0",
        marginRight: "0",
        marginTop: "20px"
    };
    const styleLable = {
        fontWeight: 700,
        marginTop: "5px",
        marginLeft: "20px",
        marginRight: "20px"
    };
    const divConstolsRow = {
        display: "flex",
        flexWrap: "wrap"
    } as React.CSSProperties;
    const { filterStore } = useStore();
    const { dataByYears, dataFilterdByYears, dataFilterd } = filterStore;
    React.useEffect(() => {
        function handleResize() {
            const size = getSize(window.innerWidth)
            setGraphSize(size)
        }
        window.addEventListener('resize', handleResize)
        return (() => { window.removeEventListener('resize', handleResize) })
    })
    let graph1Size = Math.min(380, graphSize)
    let graph2Size = Math.min(600, graphSize)
    //let width = window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;  
    let reactData1 = toJS(dataByYears)
    let reactData2 = toJS(dataFilterdByYears)
    let reactData3 = toJS(dataFilterd)
    let barsGrp2 = filterStore.groupBy2.getBars();
    let reactDataGrp2 = toJS(filterStore.dataGroupby2)
    if (reactData1.length > 0) {
        return (
            <div className="row" style={style}>
                <SmallCard styleType={2} title={t('CasualtiesByFilter')}>
                    <MyBarChart data={reactData2} width={graph1Size} fill="#FE9772" />
                </SmallCard>
                <SmallCard styleType={3}>
                    <SelectGroupBy id="Graphs.Main" />
                    <MyBarChart data={reactData3} width={graph2Size} height={graph2Size * 0.65}></MyBarChart>
                </SmallCard>
                <SmallCard width={graphSize + 150}>
                    <div style={divConstolsRow}>
                        <span style={styleLable}> {t('GroupBy')}:</span>
                        <SelectGroupBy id="Graphs.Grp2" labelText='' />
                        <SelectGroupBy2 id="Graphs" />
                        {/* <RangeSlider id="Graphs" label="resize" value={80} onChange={onSizeSliderChange}/> */}
                    </div>
                    <MyBarChart data={reactDataGrp2} bars={barsGrp2} width={graphSize} height={graphSize * 0.62} legendType="top"></MyBarChart>
                </SmallCard>
            </div>
        )
    }
    else return null;
})
    // const onSizeSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     let size:number = parseInt(event.target.value)
    //     switch(true) {
    //         case (size <= 25):
    //             size= 300;
    //             break;
    //         case (size <= 50):
    //             size= 500;
    //           break;
    //         case (size <= 75):
    //             size= 800;
    //           break;
    //         case (size <= 100):
    //             size= 1200;
    //           break;
    //         default:
    //             size= 500;
    //       }
    //     setGraphSize(size) 
    //   };

// function debounce(fn:()=>void, ms:any ) {
//     let timer :any
//     return _ => {
//       clearTimeout(timer)
//       timer = setTimeout(_ => {
//         timer = null
//         fn.apply(this , arguments)
//       }, ms)
//     };
//   }