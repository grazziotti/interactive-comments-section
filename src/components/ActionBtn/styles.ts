import styled from 'styled-components'
import { colors, font } from '../../styles/variables'

export const Container = styled.button`
	min-width: 10.4rem;
	padding: 1.5rem 0;
	font-size: ${font.size.body};
	font-weight: ${font.weight.bold};
	border-radius: 1rem;
	background-color: ${colors.lightGrayishBlue};
	color: ${colors.white};
	transition: all 0.3s;

	&.active {
		background-color: ${colors.moderateBlue};
	}

	&.active:hover {
		background-color: ${colors.lightGrayishBlue};
	}
`
