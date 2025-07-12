// TODO

export const HOUSEHOLD = {
  name: 'Хозтовары',
  value: 'household',
  categories: [
    {
      name: 'Уборка и дезинфекция',
      value: 'cleaning',
      subcategories: [
        {
          name: 'Моющие средства',
          value: 'detergents',
          filters: [
            {
              name: 'Тип',
              values: ['Для посуды', 'Для пола', 'Для стекол', 'Для кухни'],
            },
          ],
        },
        {
          name: 'Дезинфицирующие средства',
          value: 'disinfectants',
          filters: [],
        },
        {
          name: 'Инвентарь для уборки',
          value: 'cleaning-tools',
          filters: [
            { name: 'Тип', values: ['Швабры', 'Щётки', 'Тряпки', 'Ведра'] },
          ],
        },
        {
          name: 'Перчатки и средства защиты',
          value: 'gloves-ppe',
          filters: [
            { name: 'Материал', values: ['Нитрил', 'Латекс', 'Полиэтилен'] },
          ],
        },
      ],
    },
    {
      name: 'Упаковка и тара',
      value: 'packaging',
      subcategories: [
        {
          name: 'Контейнеры',
          value: 'containers',
          filters: [
            { name: 'Материал', values: ['Пластик', 'Картон', 'Алюминий'] },
          ],
        },
        {
          name: 'Пищевая плёнка и фольга',
          value: 'wraps',
          filters: [],
        },
        {
          name: 'Пакеты и мешки',
          value: 'bags',
          filters: [
            {
              name: 'Тип',
              values: ['Пакеты майка', 'Фасовочные', 'Мешки для мусора'],
            },
          ],
        },
        {
          name: 'Коробки и лотки',
          value: 'boxes-trays',
          filters: [],
        },
      ],
    },
    {
      name: 'Одноразовая посуда и столовые приборы',
      value: 'disposables',
      subcategories: [
        {
          name: 'Стаканы',
          value: 'cups',
          filters: [
            { name: 'Материал', values: ['Картон', 'Пластик'] },
            { name: 'Объем', values: ['100 мл', '200 мл', '300 мл', '500 мл'] },
          ],
        },
        {
          name: 'Тарелки и лотки',
          value: 'plates-trays',
          filters: [],
        },
        {
          name: 'Столовые приборы',
          value: 'cutlery',
          filters: [
            { name: 'Тип', values: ['Вилки', 'Ложки', 'Ножи', 'Лопатки'] },
          ],
        },
        {
          name: 'Трубочки и мешалки',
          value: 'stirrers-straws',
          filters: [],
        },
      ],
    },
    {
      name: 'Средства гигиены',
      value: 'hygiene',
      subcategories: [
        {
          name: 'Бумажные полотенца',
          value: 'paper-towels',
          filters: [],
        },
        {
          name: 'Туалетная бумага',
          value: 'toilet-paper',
          filters: [],
        },
        {
          name: 'Салфетки',
          value: 'napkins',
          filters: [],
        },
        {
          name: 'Мыло и санитайзеры',
          value: 'soap-sanitizers',
          filters: [{ name: 'Тип', values: ['Жидкое мыло', 'Санитайзер'] }],
        },
        {
          name: 'Диспенсеры',
          value: 'dispensers',
          filters: [],
        },
      ],
    },
    {
      name: 'Текстиль',
      value: 'textiles',
      subcategories: [
        {
          name: 'Полотенца',
          value: 'towels',
          filters: [{ name: 'Тип', values: ['Кухонные', 'Барные'] }],
        },
        {
          name: 'Скатерти и салфетки',
          value: 'table-linen',
          filters: [],
        },
      ],
    },
  ],
};
