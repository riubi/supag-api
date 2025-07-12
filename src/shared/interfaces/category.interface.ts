export interface IMainCategory {
  name: string;
  value: string;
  categories: ICategory[];
}

export interface ICategory {
  name: string;
  value: string;
  subcategories: ISubcategory[];
}

export interface ISubcategory {
  name: string;
  value: string;
  filters?: IFilter[];
}

export interface IFilter {
  name: string;
  values?: string[];
  icon?: string;
  isRange?: boolean;
  selectedValues?: string[];
}
