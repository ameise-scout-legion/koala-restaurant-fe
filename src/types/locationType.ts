export interface LocationResponse {
  LocationID: number;
  Address: string;
  City: string;
  State: string;
  ZipCode: string;
  Country: string;
  CreationDate: string;
  ModificationDate: string;
}
export interface LocationPayload {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
