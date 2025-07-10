import { transformPost } from '../transformers';

export const getPosts = (searchPhrase, page, limit) => {
	return fetch(
		`http://localhost:3005/posts?title_like=${searchPhrase}&_page=${page}&_limit=${limit}`,
	)
		.then((loadedPosts) =>
			Promise.all([loadedPosts.json(), loadedPosts.headers.get('X-Total-Count')]),
		)
		.then(([loadedPosts, totalCount]) => ({
			posts: loadedPosts && loadedPosts.map(transformPost),
			totalCount: totalCount ? parseInt(totalCount, 10) : 0, // Преобразование в число
		}));
};
