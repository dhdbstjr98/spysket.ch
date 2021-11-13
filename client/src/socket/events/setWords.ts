import { setWords } from '../../redux/slices/game';
import { AppDispatch } from '../../redux/store';

interface Props {
  words: [string, string, string] | null;
}

export default (dispatch: AppDispatch) =>
  ({ words }: Props): void => {
    dispatch(
      setWords(
        words
          ? words.map((name) => ({
              name,
              count: 0,
            }))
          : null,
      ),
    );
  };
