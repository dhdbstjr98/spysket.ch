import { setStatus, Status } from '../../redux/slices/game';
import { AppDispatch } from '../../redux/store';

interface Props {
  status: Status
}

export default (dispatch: AppDispatch) =>
  ({ status }: Props): void => {
    dispatch(
      setStatus(status)
    );
  };
