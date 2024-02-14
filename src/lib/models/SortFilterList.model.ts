type typeOfAppliedFilterValueList = {filterValues:string[]};

export interface FiltersList {
    filterId: number;
    appliedFilterValueList: typeOfAppliedFilterValueList;
}


export interface SortFilterList {
    tabId: string;
    sortId: string;
    filtersList: FiltersList;
}