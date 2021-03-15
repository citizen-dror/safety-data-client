
import { IColumnFilter } from './ColumnFilter2';

// export const getFilterGroupBy =
//   (filterMatch: string,
//     groupName: string,
//     popMin = -1,
//     popMax = -1,
//     groupName2: string = '',
//     limit: number = 0) => {
//     let filter = `${'['
//       + '{"$match": '}${filterMatch}}`;
//     if (popMin >= 0 && popMax > 0) {
//       filter += ',{"$lookup":{'
//         + ' "from": "cities", "localField": "accident_yishuv_name",'
//         + ' "foreignField": "name_he","as": "city"'
//         + '}}';
//       filter += `,{ "$match": { "city.population": { "$gte" : ${popMin} , "$lte" : ${popMax}}}}`;
//     }
//     if (groupName2 === '') filter += `,{"$group": { "_id": "$${groupName}", "count": { "$sum": 1 }}}`;
//     else {
//       filter += `, { "$match" : { "${groupName2}" : { "$exists" : true, "$ne" : null}}}`;
//       const grpids = `{ "grp1": "$${groupName}", "grp2": "$${groupName2}"}`;
//       filter += `,{"$group": { "_id":${grpids}, "count": { "$sum": 1 }}}`;
//       filter += ',{"$group": { "_id": "$_id.grp1" , "count": { "$push": {"grp2" : "$_id.grp2","count" : "$count" } }}}';
//     }
//     if (limit === 0) filter += ',{"$sort": {"_id": 1}}';
//     else {
//       filter += `${',{"$sort": {"count": -1}}'
//         + ',{"$limit": '}${limit}}`;
//     }
//     filter += ']';
//     return filter;
//   };

// // filter accidents using aggrgation pipline
// export const getAggFilter = (filterMatch: string, popMin: number, popMax: number) => {
//   let filter = `${'['
//     + '{"$match": '}${filterMatch}}`;
//   if (popMin >= 0 && popMax > 0) {
//     filter += ',{"$lookup":{'
//       + ' "from": "cities", "localField": "accident_yishuv_name",'
//       + ' "foreignField": "name_he","as": "city"'
//       + '}}';
//     filter += `,{ "$match": { "city.population": { "$gte" : ${popMin} , "$lte" : ${popMax}}}}`;
//   }
//   filter += ']';
//   return filter;
// };

// // fiter by accidents per 100,000 city population
// export const getFilterGroupByPop = (filterMatch: string, popMin = 200000, popMax = 100000, sort: number, limit: number) => {
//   let filter = `${'['
//     + '{"$match": '}${filterMatch}}`;
//   filter += ',{"$lookup":{'
//     + ' "from": "cities", "localField": "accident_yishuv_name",'
//     + ' "foreignField": "name_he","as": "city"'
//     + '}}';
//   if (popMin >= 0 && popMax > 0) {
//     filter += `,{ "$match": { "city.population": { "$gte" : ${popMin} , "$lte" : ${popMax}}}}`;
//   }
//   filter += ',{"$group": {'
//     + '"_id": "$accident_yishuv_name","t_count" : { "$sum" : 1 },"t_population" : { "$first" : "$city.population" }'
//     + '}}';
//   filter += ',{ "$unwind" : "$t_population"}';
//   filter += ',{ "$project" : { "count" :'
//     + '{ "$multiply" : [100000, { "$divide" : ["$t_count", "$t_population"] } ]}'
//     + '}}';
//   if (limit === 0) filter += `,{"$sort": {"count": ${sort}}}`;
//   else {
//     filter += `${`,{"$sort": {"count": ${sort}}}`
//       + ',{"$limit": '}${limit}}`;
//   }
//   filter += ']';
//   return filter;
// };

// export const getMultiplefilter = (colFilter: IColumnFilter) => {
//   let filter: string = '';
//   let allChecked: boolean = true;
//   let arrfilter: number[] = [];
//   if (colFilter.allTypesOption > -1 && colFilter.arrTypes[colFilter.allTypesOption].checked) allChecked = true;
//   else {
//     // in case there is allTypesOption , it want be copied to arrfilter
//     // as it is not checked
//     const iterator = colFilter.arrTypes.values();
//     for (const filterCheck of iterator) {
//       if (filterCheck.checked) {
//         arrfilter = [...arrfilter, ...filterCheck.filters];
//       } else {
//         allChecked = false;
//       }
//     }
//   }
//   if (allChecked) filter = '';
//   else {
//     filter += ',{"$or": [';
//     filter += arrfilter.map((x: number) => {
//       if (x === -1) return `{"${colFilter.queryColName}":${null}}`;

//       // const xSafe = x.replace('"', '\\"');
//       return `{"${colFilter.queryColName}" : "${x}"}`;
//     }).join(',');
//     filter += ']}';
//   }
//   return filter;
// };

// export const getfilterCity = (cities : string[]) => {
//   let filter: string = '';
//   if (cities.length > 0) {
//      filter += ',{"$or": [';
//      filter += cities.map((x: string) => `{"accident_yishuv_name" : "${x}"}`).join(',');
//      filter += ']}';
//   }
//   return filter;
// }

// export const getFilterStreets = (streets : string[]) => {
//   let filter: string = '';
//   if (streets.length > 0 && streets[0] !== '') {
//      filter += ',{"$or": [';
//      filter += streets.map((x: string) => `{"street1_hebrew" : "${x.trim()}"}`).join(',');
//      filter += ',';
//      filter += streets.map((x: string) => `{"street2_hebrew" : "${x.trim()}"}`).join(',');
//      filter += ']}';
//   }
//   return filter;
// }

// export const getFilterFromArray = (filterName: string, valArr : string[]) => {
//   let filter: string = '';
//   if (valArr.length > 0 && valArr[0] !== '') {
//      filter += `&${filterName}=`;
//      filter += valArr.map((x: string) => `${x.trim()}`).join(',');
//   }
//   return filter;
// }

// export const  getfilterBounds = (mapBounds: L.LatLngBounds) => {
//       let filter: string = '';
//       filter += `,{"latitude":  { "$gte" : "${mapBounds.getSouth()}","$lte": "${mapBounds.getNorth()}"}}`;
//       filter += `,{"longitude":  { "$gte" : "${mapBounds.getWest()}","$lte": "${mapBounds.getEast()}"}}`;
//       return filter;
//    }