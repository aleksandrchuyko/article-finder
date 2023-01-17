import { Link, useLocation } from 'react-router-dom';

import { ArticleCard } from './ArticleCard/ArticleCard';

interface IProps {
  articles: IArticle[];
}

interface IArticle {
  id: number;
  title: string;
  overview: string;
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
