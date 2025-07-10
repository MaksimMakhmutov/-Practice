import { Link } from 'react-router-dom';
import { Icon } from '../../../icon/icon';
import styled from 'styled-components';

export const LogoContainer = ({ className }) => (
	<Link className={className} to="/">
		<Icon iconId="fa-code" size="70px" margin="0 10px 0 0" />
		<div>
			<LargeText>Блок</LargeText>
			<SmallText>веб-разработчик</SmallText>
		</div>
	</Link>
);

const LargeText = styled.div`
	font-size: 48px;
	font-weight: 600;
	line-height: 48px;
	margin-top: 17px;
`;
const SmallText = styled.div`
	font-size: 18px;
	font-weight: bold;
`;
export const Logo = styled(LogoContainer)`
	display: flex;
	margin-top: -21px;
`;
