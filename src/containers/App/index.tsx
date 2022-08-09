import UserForm from 'components/UserForm';
import React from 'react';
import style from './style.module.scss';

const App: React.FC = () => {
  return (
    <div className={style.app}>
      <UserForm />
    </div>
  );
};

export default App;
