import { useState, useEffect, useCallback } from 'react';
import { getTopStories, getStoryById } from '../lib/api';
import { News } from '../models/News';
import { useInterval } from '../../../shared/utils/interval';

export const useNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      const topStoryIds = await getTopStories();
      const newsData = await Promise.all(
        topStoryIds.slice(0, 100).map(async (id: number) => {
          return await getStoryById(id);
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

  return { news, lastUpdated, isLoading, handleRefreshNews };
};
