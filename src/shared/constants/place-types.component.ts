export const PLACE_TYPES = [
  {
    name: 'Бар',
    value: 'bar',
  },
  {
    name: 'Бургерная',
    value: 'burger_place',
  },
  {
    name: 'Закусочная',
    value: 'snack_bar',
  },
  {
    name: 'Кафе',
    value: 'cafe',
  },
  {
    name: 'Кондитерская',
    value: 'bakery',
  },
  {
    name: 'Кофейня',
    value: 'coffee_shop',
  },
  {
    name: 'Паб',
    value: 'pub',
  },
  {
    name: 'Пиццерия',
    value: 'pizzeria',
  },
  {
    name: 'Ресторан',
    value: 'restaurant',
  },
  {
    name: 'Столовая',
    value: 'canteen',
  },
  {
    name: 'Суши-бар',
    value: 'sushi_bar',
  },
  {
    name: 'Фастфуд',
    value: 'fast_food',
  },
  {
    name: 'Другое',
    value: 'other',
  },
];

export function getPlaceTypeName(value: string): string {
  return PLACE_TYPES.find((p) => p.value === value)?.name ?? '';
}
