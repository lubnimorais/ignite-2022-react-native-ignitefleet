import { ToastConfig } from 'react-native-toast-message';
import { TopMessage } from '../components/TopMessage';

export const toastConfig: ToastConfig = {
  info: ({ text1 }) => <TopMessage title={String(text1)} />,
};
