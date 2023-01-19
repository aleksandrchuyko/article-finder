import { Link, useLocation } from 'react-router-dom';

import { ArticleCard } from './ArticleCard/ArticleCard';

import { IArticle } from 'interfaces';

interface IProps {
  articles: IArticle[];
}



export const ArticlesList: React.FC<IProps> = ({ articles }) => {
  const location = useLocation();
  return (
    <div>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link style={{textDecoration: 'none', color: 'black'}} to={`${article.id}`} state={{ from: location }}>
              <ArticleCard title={article.title} overview={article.overview} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
