import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useServerRequest } from '../../hooks';
import { Pagination, PostCard, Search } from './components';
import { PAGINNATION_LIMIT } from '../../bff/constants';
import { getTotalPagesCount } from './utils/getLastPagesCount';
import { debounce } from './utils';

const MainContainer = ({ className }) => {
	const requestServer = useServerRequest();

	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const { res: postsData, totalPosts } = await requestServer(
				'fetchPosts',
				searchPhrase,
				page,
				PAGINNATION_LIMIT,
			);

			setPosts(postsData);
			setTotalPages(getTotalPagesCount(totalPosts, PAGINNATION_LIMIT));
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestServer, page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<div className="posts-and-search">
				{' '}
				<Search onChange={onSearch} searchPhrase={searchPhrase} />
				{posts.length ? (
					<div className="post-list">
						{posts.map(
							({ id, title, imageUrl, publishedAt, commentsCount }) => (
								<PostCard
									key={id}
									id={id}
									title={title}
									imageUrl={imageUrl}
									publishedAt={publishedAt}
									commentsCount={commentsCount}
								/>
							),
						)}
					</div>
				) : (
					<div className="no-posts-found">Статьи не найдены</div>
				)}
			</div>

			{totalPages > 1 && (
				<Pagination page={page} setPage={setPage} totalPages={totalPages} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	& .posts-and-search {
		display: flex;
		flex-direction: column;
		justify-content: stace-between;
	}

	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px 20px 80px;
	}

	& .no-posts-found {
		text-align: center;
		margin-top: 40px;
		fon-size: 18px;
	}
`;
