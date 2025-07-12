export interface IUnpResponse {
  ckodsost: string; // код состояния плательщика
  dlikv: null; // дата изменения состояния плательщика
  dreg: string;
  nmns: string; // код инспекции МНС
  vkods: string;
  vlikv: null;
  vmns: string; // наименование инспекции МНС
  vnaimk: string; // краткое наименование плательщика
  vnaimp: string; // полное наименование плательщика
  vpadres: string; // адрес плательщика;
  vunp: string; // УНП плательщика
}

export interface IPlace {
  name: string;
  address: string;
  type: string[];
}

export interface IManagerDetails {
  name: string;
  position: string;
  phone: string;
}

export interface IRegisterData {
  unpData: IUnpResponse;
  email: string;
  password: string;
  isCustomer: boolean;
  places: IPlace[];
  managerDetails: IManagerDetails;
}
