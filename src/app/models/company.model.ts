export interface ICompany {
  id: number;
  name: string;
  alias: string;
  identificationTypeId: string;
  identificationNumber: string;
  address: string;
  email: string;
  phone: string;
  mobile: string;
  vat: string;
  taxes: string;
  slogan: string;
  message: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}
