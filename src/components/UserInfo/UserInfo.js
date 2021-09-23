import React from 'react';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import useFetchUser from '../../hooks/useFetchUser.hook';
import { getUserById } from '../../selector/getUserById.selector';

export default function UserInfo() {
  const { id } = useParams();
  const user = useRecoilValue(getUserById({ id }));
  const userEmail = useRecoilValue(getUserById({ id, data: 'email' }));

  useFetchUser();
  console.log(userEmail);
  return (
    <div data-testid="test-user-info">
      {user.length > 0 && (
        <p data-testid="test-user-info-data">
          Hi:
          {user.map((userInfo) => (
            <span key={userInfo.id}>{userInfo.name}</span>
          ))}
          <br />
          Email: <span>{userEmail}</span>
        </p>
      )}
    </div>
  );
}
