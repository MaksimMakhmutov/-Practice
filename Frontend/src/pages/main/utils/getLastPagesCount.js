export const getTotalPagesCount = (totalPosts, limit) => {
	return Math.ceil(totalPosts / limit);
};
