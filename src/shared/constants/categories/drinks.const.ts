export const DRINKS = {
  name: 'Напитки',
  value: 'drinks',
  categories: [
    // АЛКОГОЛЬНЫЕ
    // {
    //   name: 'Алкогольные',
    //   value: 'alcohol',
    //   subcategories: [
    //     {
    //       name: 'Водка',
    //       value: 'vodka',
    //       filters: [],
    //     },
    //     { name: 'Джин', value: 'gin', filters: [] },
    //     {
    //       name: 'Бренди/Коньяк',
    //       value: 'brandy-cogniac',
    //       filters: [],
    //     },
    //     {
    //       name: 'Текила/Мескаль',
    //       value: 'tequila-mezcal',
    //       filters: [{ name: 'Тип', values: ['Blanco', 'Repasado'] }],
    //     },
    //     {
    //       name: 'Ром',
    //       value: 'rum',
    //       filters: [{ name: 'Тип', values: ['Светлый', 'Темный', 'Spicy'] }],
    //     },
    //     {
    //       name: 'Виски',
    //       value: 'whiskey',
    //       filters: [{ name: 'Тип', values: ['Single malt', 'Blended malt'] }],
    //     },
    //     { name: 'Биттеры', value: 'bitter', filters: [] },
    //     { name: 'Аниссет', value: 'anisset', filters: [] },
    //   ],
    // },
    // СЛАБОАЛКОГОЛЬНЫЕ
    {
      name: 'Слабоалкогольные',
      value: 'low-alcohol',
      subcategories: [
        // {
        //   name: 'Вина',
        //   value: 'wine',
        //   filters: [
        //     {
        //       name: 'Тип',
        //       values: ['Белое', 'Красное', 'Розовое'],
        //     },
        //     {
        //       name: 'Сухость',
        //       values: ['Сухое', 'Сладкое', 'Полусладкое', 'Полусухое'],
        //     },
        //   ],
        // },
        // {
        //   name: 'Крепленые вина',
        //   value: 'fortified-wine',
        //   filters: [
        //     {
        //       name: 'Тип',
        //       values: ['Белое', 'Красное', 'Розовое'],
        //     },
        //     {
        //       name: 'Сухость',
        //       values: ['Сухое', 'Сладкое', 'Полусладкое', 'Полусухое'],
        //     },
        //   ],
        // },
        // {
        //   name: 'Игристые вина',
        //   value: 'sparkling-wine',
        //   filters: [
        //     {
        //       name: 'Тип',
        //       values: ['Белое', 'Розовое'],
        //     },
        //     {
        //       name: 'Сухость',
        //       values: ['Сухое', 'Сладкое', 'Полусладкое', 'Полусухое'],
        //     },
        //   ],
        // },
        {
          name: 'Пиво',
          value: 'beer',
          filters: [
            {
              name: 'Тип',
              values: ['Светлое', 'Темное'],
            },
            {
              name: 'Фильтрация',
              values: ['Фильтрованное', 'Нефильтрованное'],
            },
          ],
        },
        // { name: 'Ликеры', value: 'liquors', filters: [] },
      ],
    },
    // БЕЗАЛКОГОЛЬНЫЕ
    {
      name: 'Безалкогольные',
      value: 'alcohol-free',
      subcategories: [
        {
          name: 'Соки',
          value: 'juice',
          filters: [],
        },
        {
          name: 'Вода',
          value: 'water',
          filters: [
            { name: 'Газация', values: ['Газированная', 'Негазированная'] },
          ],
        },
        {
          name: 'Энергетики',
          value: 'energy-drinks',
          filters: [],
        },
        { name: 'Содовые', value: 'soda', filters: [] },
      ],
    },
  ],
};
