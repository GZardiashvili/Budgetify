import {IMenuItem} from './imenu-item';
import {
  faCalendarCheck,
  faChartColumn,
  faHome,
  faMoneyBill, faRightLeft,
  faTag,
} from '@fortawesome/free-solid-svg-icons';

export const MENU_CONFIG: IMenuItem[] = [
  {
    id: 'transactions',
    title: 'Transactions',
    icon: faRightLeft,
    route: '/transactions',
    permission: 'user',
  },
  {
    id: 'categories',
    title: 'categories',
    icon: faTag,
    route: '/categories',
    permission: 'user',
  },
  {
    id: 'subscriptions',
    title: 'Subscriptions',
    icon: faCalendarCheck,
    route: '/subscriptions',
    permission: 'user',
  },
  {
    id: 'obligatory',
    title: 'Obligatory',
    icon: faMoneyBill,
    route: '/obligatory',
    permission: 'user',
  },
  {
    id: 'statistics',
    title: 'Statistics',
    icon: faChartColumn,
    route: '/statistics',
    permission: 'user',
  },
];
