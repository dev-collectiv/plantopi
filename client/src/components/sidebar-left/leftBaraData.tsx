import IleftBarData from './Interfases';
import { Calendar, Chatting, Home, Image, User } from 'assets/icons';

export const leftBarData: IleftBarData[] = [
  {
    title: 'home',
    path: '/home',
    icon: Home,
    cName: 'nav-text'
  },
  {
    title: 'user',
    path: '/user',
    icon: User,
    cName: 'nav-text'
  },
  {
    title: 'schedule',
    path: '/schedule',
    icon: Calendar,
    cName: 'nav-text'
  },
  {
    title: 'photo',
    path: '/photo',
    icon: Image,
    cName: 'nav-text'
  },
  {
    title: 'char',
    path: '/char',
    icon: Home,
    cName: 'nav-text'
  },
  {
    title: 'messages',
    path: '/messages',
    icon: Chatting,
    cName: 'navtext'
  }
];
