import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import useGetUsersList from '../../hooks/useGetUsersList.hook';
import { getUserById } from '../../selector/getUserById.selector';

export default function UserInfo() {
  const [userNameLoadable] = useGetUsersList();
  const { id } = useParams();
  const user = useRecoilValue(getUserById({ id }));
  const userEmail = useRecoilValue(getUserById({ id, data: 'email' }));

  switch (userNameLoadable.state) {
    case 'hasValue':
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
          <Link to="/">Back</Link>
        </div>
      );
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      throw userNameLoadable.contents;
    default:
      return null;
  }
}
