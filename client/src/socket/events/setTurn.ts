import { setTurn, Turn } from '../../redux/slices/game';
import { AppDispatch } from '../../redux/store';

interface Props {
  turn: Turn;
}

export default (dispatch: AppDispatch) =>
  ({ turn }: Props): void => {
    dispatch(setTurn(turn));
  };
