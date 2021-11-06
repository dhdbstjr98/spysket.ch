import { Status, setGame } from '../../redux/slices/game';
import { AppDispatch } from '../../redux/store';

interface Props {
  name: string;
  room: {
    room: string;
    users: { name: string; point: number; ready: boolean }[];
    status: Status;
  };
}

export default (dispatch: AppDispatch) =>
  ({ name, room }: Props): void => {
    dispatch(
      setGame({
        name,
        ...room,
      }),
    );
  };
