export const getCommentsCount = (comments, postId) => {
	const postComments = comments.filter(
		({ postId: postIdForComments }) => postIdForComments === postId,
	);
	return postComments.length;
};
