import { FC, useState, useEffect, useCallback, useRef } from 'react';
import { Panel, PanelHeader, Group, Header, SimpleCell, Spinner, Div, Text, Button } from '@vkontakte/vkui';
import { format } from 'date-fns';

interface News {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
  time: number;
}

const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const New: FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
      const topStoryIds = await response.json();

      const newsData = await Promise.all(
        topStoryIds.slice(0, 100).map(async (id: number) => {
          const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          return await storyResponse.json();
        })
      );

      const sortedNews = newsData.sort((a, b) => b.time - a.time);
      setNews(sortedNews);
      setIsLoading(false);
      setLastUpdated(new Date());
      console.log('News updated:', new Date());
    } catch (error) {
      console.error('Error fetching news:', error);
      setIsLoading(false);
    }
  }, []);

  useInterval(fetchNews, 60000); 

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleRefreshNews = () => {
    setIsLoading(true);
    fetchNews();
  };

  return (
    <Panel id="new">
      <PanelHeader>Новости</PanelHeader>
      {isLoading ? (
        <Group header={<Header mode="secondary">Загрузка новостей...</Header>}>
          <Div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <Spinner size="large" />
          </Div>
        </Group>
      ) : (
        <Group header={<Header mode="secondary">Последние новости</Header>}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
            <Text height="regular">Последнее обновление: {lastUpdated ? format(lastUpdated, 'HH:mm:ss') : '-'}</Text>
            <Button onClick={handleRefreshNews}>Обновить</Button>
          </div>
          {news.map((item) => (
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

export default New;
