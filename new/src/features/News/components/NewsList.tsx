import { FC } from 'react';
import { Panel, PanelHeader, Group, Header, SimpleCell, Text, Button } from '@vkontakte/vkui';
import { format } from 'date-fns';
import { useNews } from '../hooks/useNews';
import { News } from '../models/News';
import { Spinner } from '../../../shared/ui';

const NewsList: FC = () => {
  const { news, lastUpdated, isLoading, handleRefreshNews } = useNews();

  return (
    <Panel id="new">
      <PanelHeader>Новости</PanelHeader>
      {isLoading ? (
        <Group header={<Header mode="secondary">Загрузка новостей...</Header>}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <Spinner size="large" />
          </div>
        </Group>
      ) : (
        <Group header={<Header mode="secondary">Последние новости</Header>}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
            <Text height="regular">Последнее обновление: {lastUpdated ? format(lastUpdated, 'HH:mm:ss') : '-'}</Text>
            <Button onClick={handleRefreshNews}>Обновить</Button>
          </div>
          {news.map((item: News) => (
            <SimpleCell
              key={item.id}
              before={item.score}
              subtitle={
                <div>
                  <Text height="regular">{format(new Date(item.time * 1000), 'dd.MM.yyyy')}</Text>
                  <Text height="regular">Автор: {item.by}</Text>
                </div>
              }
              onClick={() => window.open(item.url, '_blank')}
            >
              {item.title}
            </SimpleCell>
          ))}
        </Group>
      )}
    </Panel>
  );
};

export default NewsList;
