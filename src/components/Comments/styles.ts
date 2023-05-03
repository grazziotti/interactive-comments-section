import styled from 'styled-components'
import { colors, devices } from '../../styles/variables'

export const Container = styled.ul`
	width: 100%;

	.comment-replies {
		padding-left: 4.6rem;
		margin-left: 4.6rem;
		border-left: 2px solid ${colors.lightGray};
	}

	@media (max-width: ${devices.mobile}) {
		.comment-replies {
			padding-left: 1.6rem;
			margin-left: 1.6rem;
		}
	}
`
