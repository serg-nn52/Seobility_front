/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { IError, IUser } from '..';
import style from './style.module.scss';

interface IPropsInput {
  name: string;
  label: string;
  placeholder: string;
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  errors: IError;
  setErrors: React.Dispatch<React.SetStateAction<IError>>;
}

const Input: React.FC<IPropsInput> = (props) => {
  const { name, label, placeholder, setUser, user, errors, setErrors } = props;

  let isErrorInput = false;

  useEffect(() => {
    setErrors({ ...errors, [name]: isErrorInput });
  }, [user[name as keyof IUser], isErrorInput]);

  const createTypeDate = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.target.value = e.target.value.split('.').reverse().join('-');
    e.target.id === 'date'
      ? (e.target.type = 'date')
      : (e.target.type = 'text');
  };

  const createTypeText = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.target.type = 'text';
    e.target.value = e.target.value.split('-').reverse().join('.');
  };

  const validationInput = (parameter: keyof IUser) => {
    if (user[parameter] === ' ') {
      user[parameter] = '';
    }
    switch (parameter) {
      case 'name':
        if (
          (user[parameter].split(' ').length > 2 ||
            !/^[a-z\s]+$/iu.test(user[parameter])) &&
          user[parameter] !== ''
        ) {
          isErrorInput = true;
        }

        user[parameter].split(' ').forEach((el) => {
          if ((el.length < 3 && el.length > 0) || el.length > 30) {
            isErrorInput = true;
          }
        });

        return user[parameter].toUpperCase();
      case 'email':
        if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(user[parameter]) &&
          user[parameter] !== '' &&
          user[parameter] !== ' '
        ) {
          isErrorInput = true;
        }
        return user[parameter];
      case 'phoneNumber':
        if (
          !/^((\+7))\d{10,10}$/.test(user[parameter]) &&
          user[parameter] !== ''
        ) {
          isErrorInput = true;
        }
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
        if (
          (user[parameter].length < 10 || user[parameter].length > 300) &&
          user[parameter] !== ''
        ) {
          isErrorInput = true;
        }
        return user[parameter];
      default:
        return user[parameter];
    }
  };

  return (
    <div className={style.input}>
      <label htmlFor={name}>{label}</label>
      {name === 'message' ? (
        <textarea
          id={name}
          value={validationInput(name as keyof IUser)}
          placeholder={placeholder}
          maxLength={300}
          name={name}
          style={{ border: isErrorInput ? '1px solid red' : '' }}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setUser({ ...user, [name]: e.target.value })
          }
        />
      ) : (
        <input
          type="text"
          id={name}
          placeholder={placeholder}
          value={validationInput(name as keyof IUser)}
          onFocus={(e) => createTypeDate(e)}
          onBlur={(e) => createTypeText(e)}
          style={{ border: isErrorInput ? '1px solid red' : '' }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, [name]: e.target.value });
          }}
        />
      )}

      <div className={isErrorInput ? style.error : style.hide}>
        Введенное значение некорректно!
      </div>
    </div>
  );
};

export default Input;
