import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '../../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL, openModal, removeCommentAsync } from '../../../../../actions';
import { useServerRequest } from '../../../../../hooks';
import { selectUserRole } from '../../../../../selectors';
import { ROLE } from '../../../../../constants';

const CommentContainer = ({ postId, id, author, content, publishedAt, className }) => {
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);
	const requestServer = useServerRequest();

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить коментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(requestServer, postId, id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

	return (
		<div className={className}>
			<div className="comment">
				<div className="information-panel">
					<div className="author">
						<Icon
							inactive={true}
							iconId="fa-user-circle-o"
							margin="0 10px 0 0"
							size="18px"
						/>
						{author}
					</div>
					<div className="published-at">
						<Icon iconId="fa-calendar-o" margin="0 10px 0 0" size="18px" />
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			{isAdminOrModerator && (
				<Icon
					iconId="fa-trash-o"
					margin="0 0 0 10px"
					size="21px"
					onClick={() => onCommentRemove(id)}
				/>
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 10px;

	& .comment {
		padding: 5px 10px;
		width: 550px;
		border: 1px solid #000;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}
	& .autor {
		display: flex;
	}
	& .published-at {
		display: flex;
	}
`;
