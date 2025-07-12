// TODO

export const PRODUCTS = {
  name: 'Продукты',
  value: 'products',
  categories: [
    {
      name: 'Овощи и фрукты',
      value: 'vegetables-fruits',
      subcategories: [
        { name: 'Овощи', value: 'vegetables', filters: [] },
        { name: 'Фрукты', value: 'fruits', filters: [] },
        { name: 'Зелень', value: 'greens', filters: [] },
        { name: 'Грибы', value: 'mushrooms', filters: [] },
        { name: 'Ягоды', value: 'berries', filters: [] },
      ],
    },
    {
      name: 'Мясные продукты',
      value: 'meat',
      subcategories: [
        {
          name: 'Мясо',
          value: 'meat',
          filters: [
            {
              name: 'Тип',
              values: ['Говядина', 'Свинина', 'Курица', 'Баранина'],
            },
          ],
        },
        { name: 'Деликатесы', value: 'delicacy', filters: [] },
        { name: 'Полуфабрикаты', value: 'semi-finished-meat', filters: [] },
        { name: 'Субпродукты', value: 'offal', filters: [] },
      ],
    },
    {
      name: 'Рыба и морепродукты',
      value: 'fish',
      subcategories: [
        {
          name: 'Рыба',
          value: 'fish',
          filters: [{ name: 'Тип', values: ['Красная', 'Белая'] }],
        },
        {
          name: 'Икра',
          value: 'caviar',
          filters: [],
        },
        {
          name: 'Морепродукты',
          value: 'seafood',
          filters: [],
        },
      ],
    },
    {
      name: 'Молочные продукты',
      value: 'dairy',
      subcategories: [
        { name: 'Молоко и сливки', value: 'milk', filters: [] },
        {
          name: 'Сметана и творог',
          value: 'cream-cottage-cheese',
          filters: [],
        },
        {
          name: 'Кисломолочные продукты',
          value: 'yogurt',
          filters: [
            {
              name: 'Тип',
              values: ['Кефир', 'Йогурт', 'Айран', 'Ряженка', 'Йогурт'],
            },
          ],
        },
        {
          name: 'Яйца',
          value: 'eggs',
          filters: [{ name: 'Тип', values: ['Куриные', 'Перепелиные'] }],
        },
        {
          name: 'Сыр',
          value: 'cheese',
          filters: [
            { name: 'Тип', values: ['Твердый', 'Мягкий', 'Плавленый'] },
          ],
        },
        { name: 'Масло и маргарин', value: 'butter', filters: [] },
        { name: 'Мороженое', value: 'icecream', filters: [] },
      ],
    },
    {
      name: 'Хлеб, выпечка, кондитерские изделия',
      value: 'bakery',
      subcategories: [
        {
          name: 'Хлеб',
          value: 'bread',
          filters: [
            { name: 'Тип', values: ['Белый', 'Черный', 'Цельнозерновой'] },
          ],
        },
        { name: 'Выпечка', value: 'pie', filters: [] },
        {
          name: 'Кондитерские изделия',
          value: 'confectionery',
          filters: [],
        },
      ],
    },
    {
      name: 'Бакалея',
      value: 'groceries',
      subcategories: [
        {
          name: 'Соль, сахар, специи',
          value: 'salt-sugar-species',
          filters: [],
        },
        { name: 'Мука, крахмал, дрожжи', value: 'flour', filters: [] },
        {
          name: 'Масло растительное и уксус',
          value: 'oil',
          filters: [
            {
              name: 'Тип',
              values: ['Подсолнечное', 'Оливковое', 'Кукурузное'],
            },
          ],
        },
        {
          name: 'Макаронные изделия, крупы, бобовые',
          value: 'pasta-grains',
          filters: [],
        },
        {
          name: 'Соусы и заправки',
          value: 'sauces',
          filters: [],
        },
        {
          name: 'Сиропы и топпинги',
          value: 'syrup',
          filters: [],
        },
        {
          name: 'Пищевые добавки',
          value: 'species',
          filters: [],
        },
      ],
    },
    {
      name: 'Кофе, чай, какао',
      value: 'coffee-tea',
      subcategories: [
        {
          name: 'Кофе',
          value: 'coffee',
          filters: [
            {
              name: 'Форма',
              values: ['Зерновой', 'Молотый', 'Растворимый', 'В капсулах'],
            },
          ],
        },
        {
          name: 'Чай и чайные напитки',
          value: 'tea',
          filters: [{ name: 'Тип', values: ['Черный', 'Зеленый', 'Травяной'] }],
        },
        {
          name: 'Какао и горячий шоколад',
          value: 'cacao',
          filters: [],
        },
      ],
    },
    {
      name: 'Орехи и сухофрукты',
      value: 'nuts-dried-fruits',
      subcategories: [
        { name: 'Орехи', value: 'nuts', filters: [] },
        { name: 'Сухофрукты', value: 'dried-fruits', filters: [] },
        { name: 'Цукаты', value: 'candied-fruits', filters: [] },
        { name: 'Семечки', value: 'seeds', filters: [] },
      ],
    },
    {
      name: 'Консервированные продукты',
      value: 'canned',
      subcategories: [
        {
          name: 'Овощи, фрукты, грибы',
          value: 'canned-vegetables-fruits',
          filters: [],
        },
        { name: 'Мясо и паштеты', value: 'canned-meat', filters: [] },
        { name: 'Рыба и морепродукты', value: 'canned-fish', filters: [] },
        {
          name: 'Джем, варенье, мед',
          value: 'canned-jam-honey',
          filters: [],
        },
      ],
    },
    {
      name: 'Замороженные продукты',
      value: 'frozen-food',
      subcategories: [
        {
          name: 'Овощи, ягоды, грибы',
          value: 'frozen-vegetables-berries',
          filters: [],
        },
        { name: 'Мясо и субпродукты', value: 'frozen-meat', filters: [] },
        { name: 'Рыба и морепродукты', value: 'frozen-fish', filters: [] },
        { name: 'Хлеб и выпечка', value: 'frozen-pastry', filters: [] },
        {
          name: 'Готовые продукты',
          value: 'frozen-finished-food',
          filters: [],
        },
        {
          name: 'Полуфабрикаты',
          value: 'frozen-semi-finished-food',
          filters: [],
        },
        { name: 'Лед', value: 'ice', filters: [] },
      ],
    },
  ],
};
