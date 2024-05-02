import { FC } from 'react';
import {
  Panel,
  PanelHeader,
  // Header,
  // Button,
  // Group,

  // Div,

  NavIdProps,
} from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';
import New from '../features/News/components/NewsList';
// import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id}) => {
  // const { photo_200, city, first_name, last_name } = { ...fetchedUser };
  // const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader>Новости</PanelHeader>
      <New/>
      {/* {fetchedUser && (
        <Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
          <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
            {`${first_name} ${last_name}`}
          </Cell>
        </Group>
      )} */}

      {/* <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={() => routeNavigator.push('persik')}>
            Покажите Персика, пожалуйста!
          </Button>
        </Div>
      </Group> */}
    </Panel>
  );
};
