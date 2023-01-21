import { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import { IMG_BASE_URL } from 'constants/themoviedb';
import { getArticleById } from 'services/api-themoviedb';
import { OverviewText, PosterImg } from './ArticleDetails.styled';

import { IArticle } from 'interfaces';


const ArticleDetails: React.FC = () => {
  const { articleId } = useParams();
  const location = useLocation();
  const [article, setArticle] = useState<Partial<IArticle>>({});

  useEffect(() => {
    if (articleId) {
      getArticleById(articleId).then((res) => {
        if (res?.data) {
          setArticle({ ...res?.data });
        }
      });
    }
  }, [articleId]);

  const backRef = location.state?.from ?? '/home';
  return (
    <>
      <h1>Article details...</h1>
      <h2>Some details</h2>
      {article && (
        <>
          <div>
            <PosterImg
              src={`${IMG_BASE_URL}${article?.poster_path}`}
              alt='Something'
            ></PosterImg>
          </div>
          <div>
            <h3>{article?.title}</h3>
            <b>
              <OverviewText>Overview</OverviewText>
            </b>
            <OverviewText>{article?.overview}</OverviewText>
          </div>
        </>
      )}
      <Link to={backRef}>Go back</Link>
    </>
  );
};

export default ArticleDetails;
