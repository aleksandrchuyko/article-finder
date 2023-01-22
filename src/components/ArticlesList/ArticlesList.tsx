import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import { ArticleCard } from './ArticleCard/ArticleCard';

import { IArticle } from 'interfaces';

interface IProps {
  articles: IArticle[];
}

export const ArticlesList: React.FC<IProps> = ({ articles }) => {
  return (
    <Grid container spacing={4}>
      {articles.map((article) => (
        <Grid item key={article.id} xs={12} sm={6} md={4}>
          <Link
            style={{ textDecoration: 'none', color: 'black' }}
            to={`${article.id}`}
          >
            <ArticleCard article={article} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};
