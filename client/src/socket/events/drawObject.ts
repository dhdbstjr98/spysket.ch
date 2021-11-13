import { fabric } from 'fabric';
import { setLastFabricObject } from '../../redux/slices/game';
import { AppDispatch } from '../../redux/store';

interface Props {
  object: fabric.Path;
}

export default (dispatch: AppDispatch) =>
  ({ object }: Props): void => {
    dispatch(setLastFabricObject(object));
  };
