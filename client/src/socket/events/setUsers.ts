import { setUsers } from '../../redux/slices/game';
import { AppDispatch } from '../../redux/store';

interface Props {
  users: { name: string; ready: boolean; point: number }[];
}

export default (dispatch: AppDispatch) =>
  ({ users }: Props): void => {
    dispatch(setUsers(users));
  };
