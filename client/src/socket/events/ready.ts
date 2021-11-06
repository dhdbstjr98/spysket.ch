import { setUser } from '../../redux/slices/game';
import { AppDispatch } from '../../redux/store';

interface Props {
  name: string;
  point: number;
  ready: boolean;
}

export default (dispatch: AppDispatch) =>
  ({ name, ready }: Props): void => {
    dispatch(setUser({ name, ready }));
  };
