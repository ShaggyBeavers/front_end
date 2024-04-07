export interface RelicDTO {
    objectType?: string;
    status: RelicStatusEnum;
    creationDate: string;
    author: string;
    regionId: number;
    name: string;
    creationPlaceId: number;
    reportIds: number[];
    relicCategoryIds: number[];
    museumId: number;
    quantity: number;
    collection: string;
    comment: string;
    copyInformation: string;
    copyCreationTime: string;
    entryBookNumber: string;
    inventoryNumber: number;
    formerInventoryNumber: number;
    relicPropertyIds: number[];
    propertyValues: string[];
    relicInfoCreateEditDTO: RelicInfoCreateEditDTO;
    // Includes nested interfaces for relicInfo, lostRelicInfo, and recoveredRelicInfo
}

export interface RelicInfoCreateEditDTO {
    techniqueId: number;
    historicalPeriodId: number;
    dimensions: string;
    marks: string;
    labels: string;
    signatures: string;
    restoration: string;
    appraisedValue: string;
    insuranceValue: string;
    annotation: string;
    LostRelicInfoCreateEditDTO?: LostRelicInfoCreateEditDTO;
    RecoveredRelicInfoCreateEditDTO?: RecoveredRelicInfoCreateEditDTO;
}

export interface LostRelicInfoCreateEditDTO {
    lossWay?: string;
    lossTime?: string;
    museumId?: number;
    probableLocation?: string;
}

export interface RecoveredRelicInfoCreateEditDTO {
    locationSource?: string;
    previousSearchInfo?: string;
    returnProcess?: string;
    returnDate?: string;
    courtDecision?: string;
}

interface RelicFilterRequest {
    historicalPeriods: string[];
    statuses: string[];
    techniques: string[];
    categories: string[];
}
