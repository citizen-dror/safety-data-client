import { observable, action, computed } from 'mobx';
import FilterChecker, { IFilterChecker } from './FilterChecker';
import dataYearsUnfilterdInit from '../assets/data-by-years.json';
import dataYearsfilterdInit from '../assets/data-by-years-filtred.json';
import dataGrpBy1Init from '../assets/data-by-grp1.json';
import dataGrp2Init from '../assets/data-by-grp2.json';

export interface IColumnFilter {
  name: string;
  dbColName: string;
  arrTypes: IFilterChecker[];
  // spaciel value, if checkd it will mark all options as true
  allTypesOption: number;
  isAllValsFalse: boolean;
  updateFilter: (aType: number, checked: boolean) => void;
}
/**  filter group of boolaen filters
*  each group represnt one column in the database that can get
* several fixd values
*/
export class ColumnFilter implements IColumnFilter {
  name: string;

  dbColName: string;

  @observable
  arrTypes: IFilterChecker[];

  allTypesOption: number;

  constructor(name: string, dbColName: string, allTypesOption: number = -1) {
    this.name = name;
    this.dbColName = dbColName;
    this.arrTypes = [];
    // if this value > -1 , there is an option to set all values as true
    this.allTypesOption = allTypesOption;
  }

  /**
   * check if all the a values in the group are false
   */
  @computed get isAllValsFalse() {
    const res = this.arrTypes.reduce((counter, currentValue) => (currentValue.checked ? ++counter : counter), 0);
    return (res === 0);
  }

  @action
  updateFilter = (aType: number, checked: boolean) => {
    // in case this filter group has no option for "select all" - update the value
    if (this.allTypesOption === -1) this.arrTypes[aType].checked = checked;
    // in case this filter has opthion for "select all"
    else if (aType === this.allTypesOption) {
      this.arrTypes.forEach((x, index) => x.checked = (index === this.allTypesOption) ? checked : !checked);
    } else {
      this.arrTypes[this.allTypesOption].checked = false;
      this.arrTypes[aType].checked = checked;
    }
  }
}

export const initInjurySeverity = () => {
  const col: IColumnFilter = new ColumnFilter('Severity', 'sev');
  col.arrTypes.push(new FilterChecker('dead', true, [1]));
  col.arrTypes.push(new FilterChecker('severly-injured', false, [2]));
  return col;
};

export const initDayNight = () => {
  const col: IColumnFilter = new ColumnFilter('DayNight', 'dn');
  col.arrTypes.push(new FilterChecker('day', true, [1]));
  col.arrTypes.push(new FilterChecker('night', true, [5]));
  return col;
};

export const initMonth = () => {
  const col: IColumnFilter = new ColumnFilter('Month', 'mn');
  col.arrTypes.push(new FilterChecker('1', true, [1]));
  col.arrTypes.push(new FilterChecker('2', true, [2]));
  col.arrTypes.push(new FilterChecker('3', true, [3]));
  col.arrTypes.push(new FilterChecker('4', true, [4]));
  col.arrTypes.push(new FilterChecker('5', true, [5]));
  col.arrTypes.push(new FilterChecker('6', true, [6]));
  col.arrTypes.push(new FilterChecker('7', true, [7]));
  col.arrTypes.push(new FilterChecker('8', true, [8]));
  col.arrTypes.push(new FilterChecker('9', true, [9]));
  col.arrTypes.push(new FilterChecker('10', true, [10]));
  col.arrTypes.push(new FilterChecker('11', true, [11]));
  col.arrTypes.push(new FilterChecker('12', true, [12]));
  return col;
};

export const initInjTypes = () => {
  const col: IColumnFilter = new ColumnFilter('Vehicle', 'injt', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('pedestrian', false, [1]));
  col.arrTypes.push(new FilterChecker('cyclist', false, [6,7]));
  col.arrTypes.push(new FilterChecker('other', false, [8,9]));
  col.arrTypes.push(new FilterChecker('motorcycle', false, [4,5]));
  col.arrTypes.push(new FilterChecker('wheels4+', false, [2,3]));
  return col;
};

export const initVehicleTypes = () => {
  const col: IColumnFilter = new ColumnFilter('VehicleType', 'vcl', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('pedestrian', false, ['null']));
  col.arrTypes.push(new FilterChecker('mobilityscooter', false, [22]));
  col.arrTypes.push(new FilterChecker('bicycle', false, [15]));
  col.arrTypes.push(new FilterChecker('e-scooter', false, [21]));
  col.arrTypes.push(new FilterChecker('e-bike', false, [23]));
  col.arrTypes.push(new FilterChecker('motorcycle', false,
    [8,9,10,19]));
  col.arrTypes.push(new FilterChecker('car', false, [1]));
  col.arrTypes.push(new FilterChecker('taxi', false, [12]));
  col.arrTypes.push(new FilterChecker('bus', false, [11,18]));
  col.arrTypes.push(new FilterChecker('tranzit', false, [2]));
  col.arrTypes.push(new FilterChecker('tender', false, [3]));
  col.arrTypes.push(new FilterChecker('truck', false,
    [24,25,5,6,7]));
  col.arrTypes.push(new FilterChecker('tractor', false, [14]));
  col.arrTypes.push(new FilterChecker('train', false, ['רכבת']));
  col.arrTypes.push(new FilterChecker('other', false, [17]));
  return col;
};

export const initVehicleTypesFull = () => {
  const col: IColumnFilter = new ColumnFilter('VehicleType', 'vehicle_vehicle_type_hebrew', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('pedestrian', false, ['null']));
  col.arrTypes.push(new FilterChecker('mobilityscooter', false, ['קלנועית חשמלית']));
  col.arrTypes.push(new FilterChecker('bicycle', false, ['אופניים']));
  col.arrTypes.push(new FilterChecker('e-scooter', false, ['קורקינט חשמלי']));
  col.arrTypes.push(new FilterChecker('e-bike', false, ['אופניים חשמליים']));
  col.arrTypes.push(new FilterChecker('motorcycle1', false, ['אופנוע 51 עד 125 סמ"ק']));
  col.arrTypes.push(new FilterChecker('motorcycle2', false, ['אופנוע 126 עד 400 סמ"ק']));
  col.arrTypes.push(new FilterChecker('motorcycle3', false, ['אופנוע 401+ סמ"ק']));
  col.arrTypes.push(new FilterChecker('car', false, ['רכב נוסעים פרטי']));
  col.arrTypes.push(new FilterChecker('taxi', false, ['מונית']));
  col.arrTypes.push(new FilterChecker('tranzit', false, ['משא עד 3.5 טון - אחוד (טרנזיט)']));
  col.arrTypes.push(new FilterChecker('tender', false, ['משא עד 3.5  טון - לא אחוד (טנדר)']));
  col.arrTypes.push(new FilterChecker('minbuss', false, ['אוטובוס זעיר']));
  col.arrTypes.push(new FilterChecker('bus', false, ['אוטובוס']));
  col.arrTypes.push(new FilterChecker('truck1', false, ['משא 3.6 עד 9.9 טון']));
  col.arrTypes.push(new FilterChecker('truck2', false, ['משא 10.0 עד 12.0 טון']));
  col.arrTypes.push(new FilterChecker('truck3', false, ['משא 12.1 עד 15.9 טון']));
  col.arrTypes.push(new FilterChecker('truck4', false, ['משא 16.0 עד 33.9 טון']));
  col.arrTypes.push(new FilterChecker('truck5', false, ['משא 34.0+ טון']));
  col.arrTypes.push(new FilterChecker('tractor', false, ['טרקטור']));
  col.arrTypes.push(new FilterChecker('train', false, ['רכבת']));
  col.arrTypes.push(new FilterChecker('other', false, ['אחר ולא ידוע']));
  return col;
};


export const initGenderTypes = () => {
  const col: IColumnFilter = new ColumnFilter('Gender', 'sex');
  col.arrTypes.push(new FilterChecker('female', true, [1]));
  col.arrTypes.push(new FilterChecker('male', true, [2]));
  return col;
};

export const initAgeTypes = () => {
  const col: IColumnFilter = new ColumnFilter('Age', 'age', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('00-04', false, [1]));
  col.arrTypes.push(new FilterChecker('05-09', false, [2]));
  col.arrTypes.push(new FilterChecker('10-14', false, [3]));
  col.arrTypes.push(new FilterChecker('15-19', false, [4]));
  col.arrTypes.push(new FilterChecker('20-29', false, [5, 6]));
  col.arrTypes.push(new FilterChecker('30-39', false, [7, 8]));
  col.arrTypes.push(new FilterChecker('40-49', false, [9, 10]));
  col.arrTypes.push(new FilterChecker('50-59', false, [11, 12]));
  col.arrTypes.push(new FilterChecker('60-69', false, [13, 14]));
  col.arrTypes.push(new FilterChecker('70-79', false, [15, 16]));
  col.arrTypes.push(new FilterChecker('80+', false, [17, 18]));
  col.arrTypes.push(new FilterChecker('unknown', false, [99]));
  return col;
};
export const initPopulationTypes = () => {
  const col: IColumnFilter = new ColumnFilter('Population', 'pt');
  col.arrTypes.push(new FilterChecker('jews', true, [1]));
  col.arrTypes.push(new FilterChecker('arabs', true, [2]));
  col.arrTypes.push(new FilterChecker('immigrants', true, [4]));
  col.arrTypes.push(new FilterChecker('others', true, [3]));
  return col;
};

export const initRoadTypes = () => {
  const col: IColumnFilter = new ColumnFilter('RoadType', 'rt');
  col.arrTypes.push(new FilterChecker('urban-junction', true, [1]));
  col.arrTypes.push(new FilterChecker('urban-road', true, [2]));
  col.arrTypes.push(new FilterChecker('non-urban-junction', true, [3]));
  col.arrTypes.push(new FilterChecker('non-urban-road', true, [4]));
  return col;
};
export const initSpeedLimit = () => {
  const col: IColumnFilter = new ColumnFilter('SpeedLimit', 'sp', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('speed50', false, [1]));
  col.arrTypes.push(new FilterChecker('speed60', false, [2]));
  col.arrTypes.push(new FilterChecker('speed70', false, [3]));
  col.arrTypes.push(new FilterChecker('speed80', false, [4]));
  col.arrTypes.push(new FilterChecker('speed90', false, [5]));
  col.arrTypes.push(new FilterChecker('speed100', false, [6]));
  col.arrTypes.push(new FilterChecker('speed110', false, [7]));
  col.arrTypes.push(new FilterChecker('speed120', false, [8]));
  col.arrTypes.push(new FilterChecker('speed-unknown', false, [0]));
  return col;
};
export const initRoadWidth = () => {
  const col: IColumnFilter = new ColumnFilter('RoadWidth', 'rw', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('road-width-5', false, [1]));
  col.arrTypes.push(new FilterChecker('road-width-7', false, [2]));
  col.arrTypes.push(new FilterChecker('road-width-10', false, [3]));
  col.arrTypes.push(new FilterChecker('road-width-14', false, [4]));
  col.arrTypes.push(new FilterChecker('road-width-14+', false, [5]));
  col.arrTypes.push(new FilterChecker('unknown', false, [0]));
  return col;
};
export const initSeparator = () => {
  const col: IColumnFilter = new ColumnFilter('Separator', 'ml', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('separator-fence', false, [2]));
  col.arrTypes.push(new FilterChecker('separator-built', false, [3]));
  col.arrTypes.push(new FilterChecker('separator-not-built', false, [4]));
  col.arrTypes.push(new FilterChecker('separator-paint', false, [1]));
  col.arrTypes.push(new FilterChecker('separator-ohter', false, [5]));
  col.arrTypes.push(new FilterChecker('separator-not-relevant', false, ['null']));
  return col;
};
export const initOneLane = () => {
  const col: IColumnFilter = new ColumnFilter('OneLane', 'ol', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('onelane-oneway', false, [1]));
  col.arrTypes.push(new FilterChecker('onelane-twoway-line', false, [2]));
  col.arrTypes.push(new FilterChecker('onelane-twoway-noline', false, [3]));
  col.arrTypes.push(new FilterChecker('onelane-unknown', false, [9]));
  col.arrTypes.push(new FilterChecker('onelane-not-relevant', false, ['null']));
  return col;
};
export const initAccidentType = () => {
  const col: IColumnFilter = new ColumnFilter('AccidentType', 'acc', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('hit-ped', false, [1]));
  col.arrTypes.push(new FilterChecker('hit-front-side', false, [2]));
  col.arrTypes.push(new FilterChecker('hit-front-front', false, [5]));
  col.arrTypes.push(new FilterChecker('hit-front-rear', false, [3]));
  col.arrTypes.push(new FilterChecker('hit-side-side', false, [4]));
  col.arrTypes.push(new FilterChecker('hit-obstacle', false, [8]));
  col.arrTypes.push(new FilterChecker('hit-turning-over', false, [10]));
  col.arrTypes.push(new FilterChecker('hit-slip', false, [11]));
  return col;
};

export const initDataYreasUnfilterd = () => dataYearsUnfilterdInit;

export const initDataYreasfilterd = () => dataYearsfilterdInit;

export const initDataGrpBy1 = () => dataGrpBy1Init;

export const initDataGrpBy2 = () => dataGrp2Init;