import { IUser } from 'components/UserForm';

export const apiPost = async (url = '', data = {} as IUser) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',

    body: JSON.stringify(data),
  });
  if (response.ok) return response.json();
  return response.status;
};
