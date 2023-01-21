import React, { useState, useEffect, useMemo, useCallback } from 'react';

import debounce from 'lodash.debounce';

import { Container, Typography } from '@mui/material';

import { ArticlesList } from 'components/ArticlesList/ArticlesList';
import { Filter } from 'components/Filter/Filter';

import { useSelector, useDispatch } from 'react-redux';
import {
  getFilter,
  setFilter,
  getKeywords,
  setKeywords,
} from 'redux/filter-slice';
import { useGetAllArticlesQuery } from 'redux/articles-api';

import { initialArticles } from 'constants/initialArticles';

import { IArticle } from 'interfaces';
import { findByKeywords } from 'helpers';

const Articles: React.FC = () => {
  const dispatch = useDispatch();
  // const [filterInput, setFilterInput] = useState('');
  const [foundedArticles, setFoundedArticles] = useState<IArticle[]>([]);
  const keywords = useSelector(getKeywords);
  const filter = useSelector(getFilter);

  const { data, isLoading } = useGetAllArticlesQuery('');

  useEffect(() => {
    let articles: IArticle[] = Array.isArray(data?.results)
      ? data?.results
      : initialArticles;
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
  }, [data, keywords]);

  // eslint-disable-next-line
  const debouncedEventHandler = useCallback(
    debounce((filterInput) => {
      let filterSplit: string[] = filterInput.trim().split(' ');
      filterSplit = filterSplit.map((word) => word.trim().toLowerCase());
      dispatch(setKeywords(filterSplit));
    }, 1000),
    []
  );

  useEffect(() => {
    debouncedEventHandler(filter);
  }, [debouncedEventHandler, filter]);

  const updateFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter(e.target.value));
  };

  const filtered = useMemo(
    () => findByKeywords(keywords, foundedArticles),
    [keywords, foundedArticles]
  );

  return (
    <main>
      <Filter name={filter} onChange={updateFilter} />

      {!isLoading && (
        <Container sx={{ py: 2 }} maxWidth='md'>
          <Typography sx={{ m: '0', fontSize: '0.85rem' }} variant='h6' align='left' paragraph>
            Results: {filtered.length}
          </Typography>
          <hr />
          <ArticlesList articles={filtered} />
        </Container>
      )}
    </main>
  );
};

export default Articles;
