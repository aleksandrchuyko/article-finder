import React, { useState, useEffect, useMemo, useCallback } from 'react';

import debounce from 'lodash.debounce';

import { ArticlesList } from 'components/ArticlesList/ArticlesList';
import { Filter } from 'components/Filter/Filter';

import { useSelector, useDispatch } from 'react-redux';
import { getFilter, setFilter } from 'redux/filter-slice';
import { useGetAllArticlesQuery } from 'redux/articles-api';

import { initialArticles } from 'constants/initialArticles';

import { IArticle } from 'interfaces';
import { findByKeywords } from 'helpers';

const Articles: React.FC = () => {
  const dispatch = useDispatch();
  const [filterInput, setFilterInput] = useState('');
  const [foundedArticles, setFoundedArticles] = useState<IArticle[]>([]);
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
      };
    });
    setFoundedArticles(articles);
  }, [data, filter]);

  // eslint-disable-next-line
  const debouncedEventHandler = useCallback(
    debounce((filterInput) => {
      let filterSplit: string[] = filterInput.trim().split(' ');
      filterSplit = filterSplit.map((word) => word.trim().toLowerCase());
      dispatch(setFilter(filterSplit));
    }, 1000),
    []
  );

  useEffect(() => {
    debouncedEventHandler(filterInput);
  }, [debouncedEventHandler, filterInput]);

  const updateFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterInput(e.target.value);
  };

  

  

  const filtered = useMemo(
    () => findByKeywords(filter, foundedArticles),
    [filter, foundedArticles]
  );

  return (
    <>
      <h1>Articles page</h1>
      {!isLoading && (
        <div>
          <Filter name={filterInput} onChange={updateFilter} />
          <p>Results: {filtered.length}</p>
          <hr />
          <ArticlesList articles={filtered} />
        </div>
      )}
    </>
  );
};

export default Articles;
