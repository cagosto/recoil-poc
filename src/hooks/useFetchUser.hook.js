import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { usersState } from '../atoms/usersState.atom';
import { getUsers } from '../selector/getUsers.selector';

export default function useFetchUser() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [users, setUsers] = useRecoilState(usersState);
  const fetchedUsers = useRecoilValue(getUsers);

  useEffect(() => {
    if (!fetchedUsers.message) {
      setUsers(fetchedUsers);
    } else {
      setErrorMessage(fetchedUsers.message);
    }
  }, [fetchedUsers, setUsers, errorMessage]);

  return [users, errorMessage];
}
