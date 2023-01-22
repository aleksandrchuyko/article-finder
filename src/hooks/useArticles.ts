import { useState, useEffect } from 'react';
import { useGetAllArticlesQuery } from 'redux/articles-api';
import { IArticle } from 'interfaces';

export const useArticles = () => {
  const [foundedArticles, setFoundedArticles] = useState<IArticle[]>([]);
  const { data, isLoading } = useGetAllArticlesQuery('');
  useEffect(() => {
    let articles: IArticle[] = Array.isArray(data?.results)
      ? data?.results
      : [];
    articles = articles.map<IArticle>((item) => {
      return {
        id: item.id,
        title: item.title,
        overview:
          item.overview.length < 100
            ? item.overview + '...'
            : item.overview.substring(0, 100) + '...',
        poster_path: item.poster_path,
      };
    });
    setFoundedArticles(articles);
  }, [data]);
  return { isLoading, foundedArticles };
};
