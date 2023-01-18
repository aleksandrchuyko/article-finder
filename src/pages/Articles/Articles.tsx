import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { ArticlesList } from 'components/ArticlesList/ArticlesList';
import { Filter } from 'components/Filter/Filter';

import { useSelector, useDispatch } from 'react-redux';
import { getFilter, setFilter } from 'redux/filter-slice';
import { useGetAllArticlesQuery } from 'redux/articles-api';

import { initialArticles } from 'constants/initialArticles';

interface IArticle {
  id: number;
  title: string;
  overview: string;
}

const Articles: React.FC = () => {
  const dispatch = useDispatch();
  const [filterInput, setFilterInput] = useState('');
  const [foundedArticles, setFoundedArticles] = useState<IArticle[]>([]);
  const filter = useSelector(getFilter);

  const { data, isLoading } = useGetAllArticlesQuery('');
  let isFiltered = false;

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

  const debouncedEventHandler = useCallback(
    debounce((filterInput) => {
      let filterSplit: string[] = filterInput.trim().split(' ');
      filterSplit = filterSplit.map((word) => word.trim().toLowerCase());
      dispatch(setFilter(filterSplit));
    }, 1000),
    []
  );

  // const debouncedEventHandler = useCallback(
  //   debounce(
  //     (filter, foundedArticles) => findByKeywords(filter, foundedArticles),
  //     1000
  //   ),
  //   []
  // );

  useEffect(() => {
    debouncedEventHandler(filterInput);
  }, [debouncedEventHandler, filterInput]);

  const updateFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterInput(e.target.value);
    // let filterSplit: string[] = e.target.value.trim().split(' ');
    // filterSplit = filterSplit.map((word) => word.trim().toLowerCase());
    // dispatch(setFilter(filterSplit));
  };

  const findByKeywords = (
    filter: string[],
    articles: IArticle[]
  ): IArticle[] => {
    if (!filter.length) return articles;

    const arr: IArticle[] = [...articles];
    const titleMatch = arr.reduce<IArticle[]>((acc, article) => {
      let isMatch = false;
      let title: string = article.title;

      filter.map((keyword: string) => {

        if (title.toLowerCase().includes(keyword) && !isMatch) {
          title = highlightText(title, keyword);
          isMatch = true;
        }
      });

      if (!isMatch) return acc;
      return [
        ...acc,
        {
          id: article.id,
          title,
          overview: article?.overview,
        },
      ];
    }, []);

    const overviewMatch = arr.reduce<IArticle[]>((acc, article) => {
      let isMatch = false;
      let overview: string = article.overview;

      filter.map((keyword: string) => {
        if (overview.toLowerCase().includes(keyword) && !isMatch) {
          overview = highlightText(overview, keyword);
          isMatch = true;
        }
      });
      if (!isMatch || titleMatch.find((item) => item.id === article.id))
        return acc;
      return [
        ...acc,
        {
          id: article.id,
          title: article?.title,
          overview,
        },
      ];
    }, []);

    return [...titleMatch, ...overviewMatch];
  };

  const highlightText = (text: string, keyword: string) => {
    const idx = text.toLowerCase().indexOf(keyword);
    if (idx >= 0 && keyword !== '') {
      const len = keyword.length;
      text = text.replace(
        text.substring(idx, idx + len),
        '<span>' + text.substring(idx, idx + len) + '</span>'
      );
    }
    return text;
  };

  const filtered = useMemo(() => findByKeywords(filter, foundedArticles), [filter]);

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
