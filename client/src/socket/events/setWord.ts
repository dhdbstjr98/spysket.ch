import { setWord } from '../../redux/slices/game';
import { AppDispatch } from '../../redux/store';

interface Props {
  word?: string;
}

export default (dispatch: AppDispatch) =>
  ({ word }: Props): void => {
    dispatch(setWord(word));
  };
