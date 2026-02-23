export interface CompanyInfo {
  name: string;
  address: string;
  oib: string;
  iban: string;
  isPdvFree: boolean;
  pdvFreeText: string;
  startingCapital: string;
  otherInfo: string;
}

export interface CustomerInfo {
  name: string;
  city: string;
  street: string;
  country: string;
  id: string;
}

export interface InvoiceItem {
  name: string;
  unit: string;
  quantity: string;
  price: string;
}

export interface InvoiceData {
  number: string;
  invoiceDate: string;
  serviceDate: string;
  dueDate: string;
  items: InvoiceItem[];
}

