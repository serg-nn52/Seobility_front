import { IUser } from 'components/UserForm';

export const checkInput = (parameter: keyof IUser, user: IUser) => {
  let isError = false;
  switch (parameter) {
    case 'name':
      if (
        (user[parameter].split(' ').length !== 2 ||
          user[parameter].split(' ').includes('') ||
          !/^[a-z\s]+$/iu.test(user[parameter])) &&
        user[parameter] !== ''
      ) {
        isError = true;
      }

      user[parameter].split(' ').forEach((el) => {
        if ((el.length < 3 && el.length > 0) || el.length > 30) {
          isError = true;
        }
      });
      break;
    case 'email':
      if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(user[parameter]) &&
        user[parameter] !== '' &&
        user[parameter] !== ' '
      ) {
        isError = true;
      }
      break;
    case 'phoneNumber':
      if (
        !/^((\+7))\d{10,10}$/.test(user[parameter]) &&
        user[parameter] !== ''
      ) {
        isError = true;
      }
      break;
    case 'message':
      if (
        (user[parameter].length < 10 || user[parameter].length > 300) &&
        user[parameter] !== ''
      ) {
        isError = true;
      }
      break;
    default:
      return isError;
  }
  return isError;
};

export const createFormatedValue = (parameter: keyof IUser, user: IUser) => {
  if (user[parameter] === ' ') {
    user[parameter] = '';
  }
  switch (parameter) {
    case 'name':
      return user[parameter].toUpperCase();
    case 'email':
      return user[parameter];
    case 'phoneNumber':
      if (user[parameter][0] !== '+') {
        return '';
      }
      if (
        user[parameter].length > 1 &&
        !/^\+?[0-9]+$/.test(user[parameter].slice(-1))
      ) {
        return user[parameter].slice(0, -1);
      }
      return user[parameter];
    case 'message':
      return user[parameter];
    default:
      return user[parameter];
  }
};
