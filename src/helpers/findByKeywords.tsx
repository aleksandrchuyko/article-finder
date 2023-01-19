import { IArticle } from 'interfaces';
import { highlightText } from './highlightText';

export const findByKeywords = (
	filter: string[],
	articles: IArticle[]
): IArticle[] => {
	if (!filter.length) return articles;

	const arr: IArticle[] = [...articles];
	const titleMatch = arr.reduce<IArticle[]>((acc, article) => {
		let isMatch = false;
		let title: string = article.title;

		filter.forEach((keyword: string) => {
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

		filter.forEach((keyword: string) => {
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