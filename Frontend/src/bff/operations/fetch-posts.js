import { getComments, getPosts } from '../api';
import { getCommentsCount } from '../utils';

export const fetchPosts = async (searchPhrase, page, limit) => {
	const [{ posts, totalCount }, comments] = await Promise.all([
		getPosts(searchPhrase, page, limit),
		getComments(),
	]);

	const postsWithComments = posts.map((post) => ({
		...post,
		commentsCount: getCommentsCount(comments, post.id),
	}));

	return {
		error: null,
		res: postsWithComments,
		totalPosts: totalCount, // Возвращаем общее количество постов
	};
};
