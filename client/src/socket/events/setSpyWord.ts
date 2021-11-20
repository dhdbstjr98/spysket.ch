import { setSpyWord } from '../../redux/slices/game';
import { AppDispatch } from '../../redux/store';

interface Props {
  word: string;
  spyWord: string;
}

export default (dispatch: AppDispatch) =>
  ({ word, spyWord }: Props): void => {
    dispatch(setSpyWord({ word, spyWord }));
  };
