import styled from 'styled-components'
import { colors, devices } from './styles/variables'

export const Container = styled.main`
	width: 100%;
	min-height: 100vh;
	background-color: ${colors.veryLightGray};

	.app-container {
		max-width: 78.5rem;
		padding: 6.4rem 2.4rem;
		margin: auto;

		.comment-list {
			width: 100%;
		}
	}

	@media (max-width: ${devices.mobile}) {
		.app-container {
			padding: 1.6rem;
		}
	}
`
