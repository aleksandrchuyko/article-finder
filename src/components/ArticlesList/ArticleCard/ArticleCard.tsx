import { OverviewText } from './ArticleCard.styled';

interface IProps {
  id?: number;
  title: string;
  overview: string;
}

export const ArticleCard: React.FC<IProps> = ({ title, overview }) => {
  
  return (
    <div>
      <OverviewText>{title}</OverviewText>
      <OverviewText>{overview}</OverviewText>
    </div>
  );
};
