import { IFilter } from '../interfaces';
import { COUNTRIES } from './countries';

export const COMMON_FILTERS: IFilter[] = [
  {
    name: 'Вес (гр.) / Объем (мл.)',
    values: ['330', '375', '500', '750', '1000'],
  }, // получить значения объемов загруженных продуктов из BE
  {
    name: 'Цена (р.)',
    values: ['50', '1000'], // получить min и max значения загруженных продуктов из BE -- range
    isRange: true,
  },
  { name: 'Страна производства', values: COUNTRIES.map((i) => i.label) }, // дефолтный список стран

  // как ранжировать безалкогольную продукцию ?
];
