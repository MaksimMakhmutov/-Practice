import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../../components';
import { Comment } from './components';

import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../../../selectors';
import { addCommentAsync } from '../../../../actions/add-comment-async';
import { PROP_TYPE, ROLE } from '../../../../constants';

const CommetsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const userRole = useSelector(selectUserRole);
	const dispatch = useDispatch();


	const onNewCommentAdd = (postId, content) => {
		dispatch(addCommentAsync(postId, content));
		setNewComment('');
	};

	const isGuest = userRole === ROLE.GUEST;

	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-comment">
					<textarea
						name="comment"
						value={newComment}
						placeholder="Комментарий..."
						onChange={({ target }) => setNewComment(target.value)}
					></textarea>
					<Icon
						iconId="fa-paper-plane-o"
						margin="0 0 0 10px"
						size="18px"
						onClick={() => onNewCommentAdd(postId, newComment)}
					/>
				</div>
			)}

			<div className="comments">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						postId={postId}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommetsContainer)`
	width: 580px;
	margin: 0 auto;

	& .new-comment {
		display: flex;
		width: 100%;
		margin: 20px 0 0;
	}

	& .new-comment textarea {
		width: 550px;
		heigth: 120px;
		font-size: 18px;
		resize: none;
	}
`;

Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT),
	postId: PropTypes.string.isRequired,
};
