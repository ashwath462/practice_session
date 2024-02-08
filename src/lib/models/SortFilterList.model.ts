import { files } from "$service-worker";

type typeOfAppliedFilterValueList = {filterValues:string[]};

class FiltersList{
    private filterId:number;
    private appliedFilterValueList: typeOfAppliedFilterValueList;

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
    private tabId: string;
    private sortId: string;
    private filtersList: FiltersList;

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