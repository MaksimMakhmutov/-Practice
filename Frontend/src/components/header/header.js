import { ControlPanel, Logo } from './components';
import styled from 'styled-components';
const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
		<Discription>
			Веб-технологии <br />
			Написание кода <br />
			Разбор ошибок
		</Discription>
		<ControlPanel />
	</header>
);

const Discription = styled.div`
	font-style: italic;
`;

export const Header = styled(HeaderContainer)`
	height: 120px;
	justify-content: space-between;
	padding: 20px 40px;
	top: 0;
	box-shadow: 0px -2px 17px #000;
	display: flex;
	position: fixed;
	width: 1000px;
	background-color: #fff;
`;
