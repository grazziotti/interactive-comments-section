import styled from 'styled-components'
import { colors, font } from '../../styles/variables'

export const Container = styled.div`
	display: flex;
	justify-content: start;
	padding: 2.4rem;
	gap: 2.4rem;
	background-color: ${colors.white};
	border-radius: 1rem;
	margin-top: 2.4rem;

	img {
		width: 3.2rem;
		height: 3.2rem;
	}

	.comment-textarea {
		flex: 1;
		min-height: 10rem;
		padding: 1.4rem 2.4rem;
		border: 2px solid ${colors.lightGray};
		border-radius: 1rem;
		resize: none;
		scrollbar-width: none;
		font-size: ${font.size.body};
		color: ${colors.grayishBlue};
		outline: none;
		transition: all 0.3s;

		&::placeholder {
			color: ${colors.darkBlue};
		}

		&:focus {
			border-color: ${colors.moderateBlue};
		}
	}

	button {
		padding: 1.5rem 3rem;
		font-size: ${font.size.body};
		font-weight: ${font.weight.bold};
		border-radius: 1rem;
		background-color: ${colors.moderateBlue};
		color: ${colors.white};
		transition: all 0.3s;

		&:hover {
			background-color: ${colors.lightGrayishBlue};
		}
	}
`
