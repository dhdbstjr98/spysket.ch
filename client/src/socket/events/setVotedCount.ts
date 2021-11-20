import { setVotedCount } from '../../redux/slices/game';
import { AppDispatch } from '../../redux/store';

interface Props {
  name: string;
  votedCount: number;
}

export default (dispatch: AppDispatch) =>
  ({ name, votedCount }: Props): void => {
    dispatch(setVotedCount({ name, votedCount }));
  };
