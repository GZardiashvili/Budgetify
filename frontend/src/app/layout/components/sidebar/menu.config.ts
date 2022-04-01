import {IMenuItem} from "./imenu-item";

export const MENU_CONFIG: IMenuItem[] = [
  {
    id: 'home',
    title: 'Home',
    icon: 'home',
    route: '/home',
    permission: 'user'
  },
  {
    id: 'categories',
    title: 'Categories',
    icon: 'categories',
    route: '/categories',
    permission: 'user'
  }, {
    id: 'subscriptions',
    title: 'Subscriptions',
    icon: 'subscriptions',
    route: '/subscriptions',
    permission: 'user'
  }, {
    id: 'obligatory',
    title: 'Obligatory',
    icon: 'Obligatory',
    route: '/obligatory',
    permission: 'user'
  }, {
    id: 'statistics',
    title: 'Statistics',
    icon: 'statistics',
    route: '/statistics',
    permission: 'user'
  },
];

