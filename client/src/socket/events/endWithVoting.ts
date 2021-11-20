import { endWithVoting } from '../../redux/slices/game';
import { AppDispatch } from '../../redux/store';

interface Props {
  votedUser: string;
}

export default (dispatch: AppDispatch) =>
  ({ votedUser }: Props): void => {
    dispatch(endWithVoting(votedUser));
  };
