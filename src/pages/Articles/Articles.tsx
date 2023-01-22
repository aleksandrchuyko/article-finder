import React, { useEffect, useMemo, useCallback } from 'react';

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

import { useArticles } from 'hooks';

import { findByKeywords } from 'helpers';

const Articles: React.FC = () => {
  const {isLoading, foundedArticles} = useArticles();
  const dispatch = useDispatch();
  
  
  const keywords = useSelector(getKeywords);
  const filter = useSelector(getFilter);

  
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
          <Typography
            sx={{ m: '0', fontSize: '0.85rem' }}
            variant='h6'
            align='left'
            paragraph
          >
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
