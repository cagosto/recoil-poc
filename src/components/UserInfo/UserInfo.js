import React from 'react';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import useFetchUser from '../../hooks/useFetchUser.hook';
import { getUserById } from '../../selector/getUserById.selector';

export default function UserInfo() {
  const { id } = useParams();
  const user = useRecoilValue(getUserById(id));

  useFetchUser();

  return (
    <div>
      {user.map((userInfo) => (
        <div key={userInfo.id}>{userInfo.name}</div>
      ))}
    </div>
  );
}
