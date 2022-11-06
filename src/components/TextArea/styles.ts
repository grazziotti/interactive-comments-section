import styled from 'styled-components'
import { colors, font } from '../../styles/variables'

export const Container = styled.textarea`
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
`
