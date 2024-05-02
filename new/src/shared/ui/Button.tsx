import { FC } from 'react';
import { Button as VkButton } from '@vkontakte/vkui';

interface ButtonProps extends React.ComponentProps<typeof VkButton> {}

const Button: FC<ButtonProps> = (props) => {
  return <VkButton {...props} />;
};

export default Button;
