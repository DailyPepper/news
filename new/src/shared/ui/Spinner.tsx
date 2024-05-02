import { FC } from 'react';
import { Spinner as VkSpinner, Div } from '@vkontakte/vkui';

interface SpinnerProps {
  size?: 'large' | 'medium' | 'small';
}

const Spinner: FC<SpinnerProps> = ({ size = 'medium' }) => {
  return (
    <Div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <VkSpinner size={size} />
    </Div>
  );
};

export default Spinner;
