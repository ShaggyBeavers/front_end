import type { Role } from './roles';

export const roleToUkr = (role: Role): string => {
  switch (role) {
    case 'ADMIN':
      return 'Адміністратор';
    case 'REGIONAL_MODERATOR':
      return 'Регіональний модератор';
    case 'MODERATOR':
      return 'Модератор';
    case 'USER':
      return 'Користувач';
  }
};