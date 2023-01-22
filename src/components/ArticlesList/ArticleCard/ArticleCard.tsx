import { Card, CardMedia, CardContent } from '@mui/material';

import { OverviewText } from './ArticleCard.styled';

import { IArticle } from 'interfaces';
import { IMG_BASE_URL } from 'constants/themoviedb';

interface IProps {
  article: IArticle;
}

export const ArticleCard: React.FC<IProps> = ({ article }) => {
  const url = article.poster_path ? IMG_BASE_URL + article.poster_path : '';
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        component='img'
        sx={{
          overflowX: 'hidden',
          height: '150px',
        }}
        image={url}
        alt='random'
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <OverviewText
          sx={{ p: '0px' }}
          gutterBottom
          variant='subtitle2'
          dangerouslySetInnerHTML={{ __html: article.title }}
        />
        <OverviewText
          sx={{ p: '0px' }}
          variant='body2'
          dangerouslySetInnerHTML={{ __html: article.overview }}
        />
      </CardContent>
    </Card>
  );
};
