import { clearGame, removeUser } from '../../redux/slices/game';
import { AppDispatch } from '../../redux/store';

interface Props {
  name?: string;
}

export default (dispatch: AppDispatch) =>
  ({ name }: Props): void => {
    if (name) {
      dispatch(
        removeUser({
          name,
        }),
      );
    } else {
      dispatch(clearGame());
    }
  };
