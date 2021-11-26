import { toast } from 'react-toastify';

interface Props {
  message: string;
}

export default ({ message }: Props): void => {
  toast(message, {
    type: 'error',
  });
};
