import { Comments, PostContent } from './components';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useMatch, useParams } from 'react-router-dom';
import { selectPost } from '../../selectors';
import { PostForm } from './components/post-form/post-form';
import { loadPostAsync, RESET_POST_DATA } from '../../actions';
import { Error, PrivateContent } from '../../components';
import { ROLE } from '../../constants';

const PostContainer = ({ className }) => {
	const params = useParams();
	const dispatch = useDispatch();
	const isEditiong = !!useMatch('/post/:id/edit');
	const isCreating = !!useMatch('/post');
	const post = useSelector(selectPost);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}
		dispatch(loadPostAsync(params.id)).then((postData) => {
			setError(postData.error);
			setIsLoading(false);
		});
	}, [dispatch, isCreating, params.id]);

	if (isLoading) {
		return null;
	}

	const SpecificPostPage =
		isCreating || isEditiong ? (
			<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
				<div className={className}>
					<PostForm post={post} />
				</div>
			</PrivateContent>
		) : (
			<div className={className}>
				<PostContent post={post} />

				<Comments comments={post.comments} postId={post.id}></Comments>
			</div>
		);

	return error ? <Error error={error} /> : SpecificPostPage;
};

export const Post = styled(PostContainer)`
	padding: 0 80px;
	margin: 40px 0;
`;
