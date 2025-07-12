import { MenuItem } from 'primeng/api';

export const SUPPORT_MENU_ITEMS: MenuItem[] = [
  {
    label: 'Юридическая информация',
    items: [
      {
        label: 'О нас',
        routerLink: ['/support', 'about-us'],
        id: 'about-us',
      },
      {
        label: 'Пользовательское соглашение',
        routerLink: ['/support', 'user-agreement'],
        id: 'user-agreement',
      },
      {
        label: 'Политика конфиденциальности',
        routerLink: ['/support', 'privacy-policy'],
        id: 'privacy-policy',
      },
    ],
  },
  {
    label: 'Клиентам',
    items: [
      {
        label: 'Вопросы и ответы',
        routerLink: ['/support', 'faq'],
        id: 'faq',
      },
      {
        label: 'Поддержка',
        routerLink: ['/support', 'write'],
        id: 'write',
      },
      {
        label: 'Сотрудничество',
        routerLink: ['/support', 'collaboration'],
        id: 'collaboration',
      },
    ],
  },
];
