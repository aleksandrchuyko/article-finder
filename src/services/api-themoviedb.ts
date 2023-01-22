import themoviedbApi from './themoviedb-axios-config';

interface IResponse {
  data: IData;
}
interface IData {
  title: string;
  overview: string;
  poster_path: string;
}

export const getArticleById = async (
  movie_id: string
): Promise<IResponse | null> => {
  const url = `/movie/${movie_id}`;

  try {
    return await themoviedbApi.get(url);
  } catch (error) {
    return null;
  }
};
