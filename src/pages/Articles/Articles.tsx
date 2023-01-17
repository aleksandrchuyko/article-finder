import React, { useState, useEffect, useMemo } from 'react';
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
  const [findedArticles, setFindedArticles] = useState<IArticle[]>([]);
  const filter = useSelector(getFilter);

  const { data, isLoading } = useGetAllArticlesQuery('');
  let articles: IArticle[];
  if (!isLoading) {
    let articles: IArticle[] = Array.isArray(data?.results)? data?.results: initialArticles;
  }
  
  // const articles: IArticle[] = data?.results;

  const updateFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterInput(e.target.value);
    let filterSplit: string[] = e.target.value.trim().split(' ');
    filterSplit = filterSplit.map((word) => word.trim().toLowerCase());
    dispatch(setFilter(filterSplit));
    debouncedEventHandler();
  };

  const findByKeywords = () => {
    console.log('find',filter, articles);

    if (Array.isArray(articles)) {
      let arr: IArticle[] = [...articles];
      // let arr: IArticle[] = articles.reduce<IArticle[]>((acc, article) => {
      //   return [
      //     ...acc,
      //     {
      //       id: article.id,
      //       title: highlightText(article?.title),
      //       overview: highlightText(article?.overview),
      //     },
      //   ];
      // }, []);
      console.log(arr);
      setFindedArticles(arr);
    }
  };

  const debouncedEventHandler = useMemo(
    () => debounce(() => findByKeywords(), 1000),
    [data, ]
  );

  const highlightText = (text: string) => {
    if (Array.isArray(filter)) {
      console.log(filter)
      return filter.reduce((acc, keyword) => {
        const idx = text.toLowerCase().indexOf(keyword);
        console.log(idx)
        if (idx >= 0) {
          const len = keyword.length;
          acc = acc.replace(
            acc.substring(idx, idx + len),
            '+!!' + acc.substring(idx, idx + len) + '+'
          );
        }
      }, text);
    }

    return text;
  };

  return (
    <>
      <h1>Articles page</h1>
      {!isLoading && (
        <div>
          <Filter name={filterInput} onChange={updateFilter} />
          <hr />
          <ArticlesList articles={findedArticles} />
        </div>
      )}
    </>
  );
};

export default Articles;
