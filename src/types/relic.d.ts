export interface Relic {
  objectType: string; 
  status: RelicStatusEnum; // Use an enum for the possible statuses
  creationDate: string; // Assuming date is a string format
  author: string;
  regionId: number; // Assuming int64 is a number
  name: string;
  creationPlaceId: number; // Assuming int64 is a number
  reportIds: number[]; // Array of numbers (int64)
  relicCategoryIds: number[]; // Array of numbers (int64)
  museumId: number; // Assuming int64 is a number
  quantity: number; // Assuming int32 is a number
  collection: string;
  comment: string;
  copyInformation: string;
  copyCreationTime: string; // Assuming date is a string format
  entryBookNumber: string;
  inventoryNumber: number; // Assuming int32 is a number
  formerInventoryNumber: number; // Assuming int32 is a number
  relicPropertyIds: number[]; // Array of numbers (int64)
  propertyValues: string[]; // Array of strings
  imageUrl: string;
  relicInfo: RelicInfoCreateEditDTO;
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
  lostRelicInfo?: LostRelicInfoCreateEditDTO;
  recoveredRelicInfo?: RecoveredRelicInfoCreateEditDTO;
}

export interface LostRelicInfoCreateEditDTO {
  lossWay: string;
  lossTime: string;
  museumId: number;
  probableLocation: string;
}

export interface RecoveredRelicInfoCreateEditDTO {
  locationSource: string;
  previousSearchInfo: string; 
  returnProcess: string;
  returnDate: string; 
  courtDecision: string;
}

// Define the RelicStatusEnum enum
export enum RelicStatusEnum {
  DESTROYED = 'DESTROYED',
  STOLEN = 'STOLEN',
  RETURNED = 'RETURNED',
  UNKNOWN = 'UNKNOWN',
}
