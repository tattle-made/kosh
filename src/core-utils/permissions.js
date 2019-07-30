import { ADMIN, SUBSCRIBER, EDITOR } from './roleTypes';

const getUserPermissions = role => {
  switch (role) {
    case ADMIN:
      return [
        'post:canDelete',
        'post:canUpload',
        'user:canView',
        'user:canDelete',
        'user:canCreate'
      ];
    case EDITOR:
      return ['user:canView'];
    case SUBSCRIBER:
      return [];
    default:
      return [];
  }
};

const getRoutePermissions = route => {
  switch (route) {
    case '/search':
      return [ADMIN, EDITOR, SUBSCRIBER];
    case '/posts/:page':
      return [ADMIN, EDITOR, SUBSCRIBER];
    case '/post/:id':
      return [ADMIN, EDITOR, SUBSCRIBER];
    case '/posts':
      return [ADMIN, EDITOR, SUBSCRIBER];
    case '/users':
      return [ADMIN, EDITOR];
    case '/users/page/:page':
      return [ADMIN, EDITOR];
    case 'user/:id':
      return [ADMIN, EDITOR];
    case '/users/update/:id':
      return [ADMIN, EDITOR];
    case 'users/delete/:id':
      return [ADMIN];
    case '/users/:page':
      return [ADMIN, EDITOR];
    case '/users/:page':
      return [ADMIN, EDITOR];
    case '/users/create':
      return [ADMIN];
    default:
      return [SUBSCRIBER];
  }
};
export { getUserPermissions, getRoutePermissions };
