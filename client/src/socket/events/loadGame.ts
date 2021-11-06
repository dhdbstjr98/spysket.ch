import { loadGame } from '../../redux/slices/game';
import { AppDispatch } from '../../redux/store';

export default (dispatch: AppDispatch) => (): void => {
  dispatch(loadGame());
};
