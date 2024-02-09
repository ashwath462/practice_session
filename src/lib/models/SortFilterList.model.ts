import { files } from "$service-worker";

type typeOfAppliedFilterValueList = {filterValues:string[]};

class FiltersList{
    public filterId:number;
    public appliedFilterValueList: typeOfAppliedFilterValueList;

    constructor(filterId:number, appliedFilterValueList:typeOfAppliedFilterValueList){
        this.filterId = filterId;
        this.appliedFilterValueList = appliedFilterValueList
    }

    public getFilterId(){
        return this.filterId;
    }
    public getAppliedFilterValueList(){
        return this.appliedFilterValueList;
    }
}


export class SortFilterList{
    public tabId: string;
    public sortId: string;
    public filtersList: FiltersList;

    constructor(tabId:string, sortId:string, filtersList: FiltersList){
        this.tabId = tabId;
        this.sortId = sortId;
        this.filtersList = filtersList;
    }

    public getTabId(){
        return this.tabId;
    }
    public getSortId(){
        return this.sortId;
    }
    public getFiltersList(){
        return this.filtersList;
    }
}