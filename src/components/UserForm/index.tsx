/* eslint-disable prefer-const */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import Preloader from 'components/Preloader';
import { apiPost } from 'network';
import style from './style.module.scss';
import Input from './Input';

export interface IUser {
  name: string;
  email: string;
  phoneNumber: string;
  date: string;
  message: string;
}

export interface IError {
  name: boolean;
  email: boolean;
  phoneNumber: boolean;
  date: boolean;
  message: boolean;
}

const UserForm: React.FC = () => {
  const initialState: IUser = {
    name: '',
    email: '',
    phoneNumber: '',
    date: '',
    message: '',
  };
  const initialErrorsState: IError = {
    name: false,
    email: false,
    phoneNumber: false,
    date: false,
    message: false,
  };

  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState(initialErrorsState);
  const [requestStatus, setRequestStatus] = useState('');
  const body = document.querySelector('body');
  const info = useRef(null);

  const getErrorValidation = () => Object.values(errors).includes(true);
  const getEmptyField = () => Object.values(user).includes('');

  requestStatus === 'pending'
    ? (body!.style.overflow = 'hidden')
    : (body!.style.overflow = '');

  const sendForm = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const isErrorValidation = getErrorValidation();
    const isEmptyField = getEmptyField();
    if (!isErrorValidation && !isEmptyField) {
      setRequestStatus('pending');
      (info.current! as HTMLDivElement).innerHTML = '';
      const res = await apiPost(
        'https://seobility.herokuapp.com/api/user',
        user,
      );
      if (res.succes) {
        setUser(initialState);
        setRequestStatus('fullfild');
      }
      if (!res.succes && res) setRequestStatus('rejected');
    } else {
      (info.current! as HTMLDivElement).innerHTML =
        'Некорректно заполнены поля!';
    }
    if (isEmptyField) {
      (info.current! as HTMLDivElement).innerHTML = 'Заполните все поля!';
    }
  };

  return (
    <div className={style.form}>
      {requestStatus === 'pending' && <Preloader />}
      {(requestStatus === '' || requestStatus === 'pending') && (
        <h1>Введите свои данные</h1>
      )}
      {requestStatus === 'fullfild' && <h1>Данные успешно отправлены!</h1>}
      {requestStatus === 'rejected' && <h1>Произошла ошибка!</h1>}
      <form action="#">
        <Input
          name="name"
          label="Имя Фамилия"
          placeholder="IVAN IVANOV"
          user={user}
          setUser={setUser}
          errors={errors}
          setErrors={setErrors}
        />
        <Input
          name="email"
          label="E-mail"
          placeholder="ivanov@mail.ru"
          user={user}
          setUser={setUser}
          errors={errors}
          setErrors={setErrors}
        />
        <Input
          name="phoneNumber"
          label="Номер телефона"
          placeholder="+79103332244"
          user={user}
          setUser={setUser}
          errors={errors}
          setErrors={setErrors}
        />
        <Input
          name="date"
          label="Дата рождения"
          placeholder="01.01.2000"
          user={user}
          setUser={setUser}
          errors={errors}
          setErrors={setErrors}
        />
        <Input
          name="message"
          label="Сообщение"
          placeholder="Сообщение, длина от 10 до 300 символов"
          user={user}
          setUser={setUser}
          errors={errors}
          setErrors={setErrors}
        />
        <div className={style.info} ref={info} />
        <button
          type="submit"
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            sendForm(e)
          }
        >
          Отправить форму
        </button>
      </form>
    </div>
  );
};

export default UserForm;
