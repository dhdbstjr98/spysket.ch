import { setWords } from '../../redux/slices/game';
import { AppDispatch } from '../../redux/store';

interface Props {
  words: [string, string, string];
}

export default (dispatch: AppDispatch) =>
  ({ words }: Props): void => {
    dispatch(
      setWords(words.map((name) => ({
        name,
        count:0
      }))),
    );
  };
