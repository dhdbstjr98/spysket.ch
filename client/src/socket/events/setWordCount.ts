import { setWordCount } from '../../redux/slices/game';
import { AppDispatch } from '../../redux/store';

interface Props {
  name: string;
  count: number;
}

export default (dispatch: AppDispatch) =>
  ({ name, count }: Props): void => {
    dispatch(setWordCount({ name, count }));
  };
