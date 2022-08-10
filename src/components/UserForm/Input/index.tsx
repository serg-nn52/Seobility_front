/* eslint-disable react-hooks/exhaustive-deps */

import { checkInput, createFormatedValue } from 'helpers/validations';
import React, { useEffect, useMemo } from 'react';
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

  useEffect(() => {
    setErrors({ ...errors, [name]: isErrorInput });
  }, [user[name as keyof IUser]]);

  const isErrorInput = useMemo(() => {
    return checkInput(name as keyof IUser, user);
  }, [user[name as keyof IUser]]);

  const formatedValue = useMemo(() => {
    return createFormatedValue(name as keyof IUser, user);
  }, [user[name as keyof IUser]]);

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

  return (
    <div className={style.input}>
      <label htmlFor={name}>{label}</label>
      {name === 'message' ? (
        <textarea
          id={name}
          value={formatedValue}
          placeholder={placeholder}
          maxLength={300}
          name={name}
          style={{
            border: isErrorInput ? '1px solid red' : '',
          }}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setUser({ ...user, [name]: e.target.value })
          }
        />
      ) : (
        <input
          type="text"
          id={name}
          placeholder={placeholder}
          value={formatedValue}
          onFocus={(e) => createTypeDate(e)}
          onBlur={(e) => createTypeText(e)}
          style={{
            border: isErrorInput ? '1px solid red' : '',
          }}
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

export default React.memo(Input);
