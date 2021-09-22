import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { usersState } from '../atoms/usersState.atom';
import { getUsers } from '../selector/getUsers.selector';

export default function useFetchUser() {
  const [users, setUsers] = useRecoilState(usersState);
  const fetchedUsers = useRecoilValue(getUsers);

  useEffect(() => {
    if (fetchedUsers) {
      setUsers(fetchedUsers);
    }
  }, [fetchedUsers, setUsers]);

  return users;
}
