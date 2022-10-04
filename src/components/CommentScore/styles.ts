import styled from 'styled-components'
import { colors, font } from '../../styles/variables'

export const Container = styled.div`
	display: inline-flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: max-content;
	padding: 0.8rem 1.2rem 1rem;
	border-radius: 1rem;
	background-color: ${colors.veryLightGray};

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;

		&:hover svg path {
			fill: ${colors.moderateBlue};
		}
	}

	.score {
		margin: 1.2rem 0 1.2rem 0;
		font-size: ${font.size.body};
		font-weight: ${font.weight.medium};
		color: ${colors.moderateBlue};
	}
`
