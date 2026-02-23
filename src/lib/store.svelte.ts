import type { CompanyInfo, CustomerInfo, InvoiceData } from './types';

function load<T>(key: string, def: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...def, ...(JSON.parse(raw) as Partial<T>) } : def;
  } catch {
    return def;
  }
}

class InvoiceStore {
  company = $state<CompanyInfo>(
    load('company', {
      name: '',
      address: '',
      oib: '',
      iban: '',
      isPdvFree: false,
      pdvFreeText: 'PDV se ne obračunava sukladno čl. 90. st.1. zakona o pdv-u',
      startingCapital: '',
      otherInfo: '',
    })
  );

  customer = $state<CustomerInfo>(
    load('customer', {
      name: '',
      city: '',
      street: '',
      country: '',
      id: '',
    })
  );

  invoice = $state<InvoiceData>(
    load('invoice', {
      number: '',
      invoiceDate: '',
      serviceDate: '',
      dueDate: '',
      items: [],
    })
  );
}

export const store = new InvoiceStore();
