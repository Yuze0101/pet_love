import { useContext, useEffect } from 'react';
import { PetContext } from '../contexts/PetContext';
import { UserContext } from '../contexts/UserContext';

export const useUpdateUserAndPetInfo = () => {
  const [userState, setUserState] = useContext(UserContext);
  const [petState, setPetState] = useContext(PetContext);
  useEffect(() => {
    setUserState({
      type: 'GET_USER_INFO',
    });
    setPetState({
      type: 'GET_PET_INFO',
    });
  }, []);
};
