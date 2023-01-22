import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Container, Box, Card, Typography } from '@mui/material';

import { IMG_BASE_URL } from 'constants/themoviedb';
import { getArticleById } from 'services/api-themoviedb';
import { TopDecoration } from './ArticleDetails.styled';

import { IArticle } from 'interfaces';

const ArticleDetails: React.FC = () => {
  const { articleId } = useParams();

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

  const url = article.poster_path ? IMG_BASE_URL + article.poster_path : '';
  const goBackLabel = '<- Back to homepage';

  return (
    <main>
      <Container sx={{ py: 2 }} maxWidth='md'>
        <Box>
          <Box position='relative'>
            <TopDecoration
              position='absolute'
              style={{ backgroundImage: `url(${url})` }}
            />
            <Box position='absolute' top={150} padding={'75px'}>
              {article && (
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: '20px',
                  }}
                >
                  <Typography
                    sx={{ p: '0px' }}
                    gutterBottom
                    variant='subtitle1'
                  >
                    {article?.title}
                  </Typography>
                  <Typography sx={{ p: '0px' }} variant='body2'>
                    {article?.overview}
                  </Typography>
                </Card>
              )}
              <Link to='/'>
                <Typography
                  sx={{ mt: '75px', ml: '50px', fontSize: '0.85rem' }}
                  variant='h6'
                  align='left'
                  color='text.secondary'
                >
                  {goBackLabel}
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>
        <Box>
          <Link to='/'>{goBackLabel}</Link>
        </Box>
      </Container>
    </main>
  );
};

export default ArticleDetails;
