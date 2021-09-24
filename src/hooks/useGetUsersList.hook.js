import { useEffect } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { usersState } from '../atoms/usersState.atom';
import { getUsers } from '../selector/getUsers.selector';

export default function useGetUsersList() {
  const userNameLoadable = useRecoilValueLoadable(getUsers);
  const [userList, setUserList] = useRecoilState(usersState);

  useEffect(() => {
    if (userNameLoadable.state === 'hasValue') {
      setUserList(userNameLoadable.contents);
    }
  }, [setUserList, userNameLoadable]);

  return [userNameLoadable, userList];
}
