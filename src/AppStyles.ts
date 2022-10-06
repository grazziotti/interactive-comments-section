import styled from 'styled-components'
import { colors } from './styles/variables'

export const Container = styled.main`
	width: 100%;
	min-height: 100vh;
	background-color: ${colors.veryLightGray};

	.comment-area {
		max-width: 78.3rem;
		width: 100%;
		min-height: 100vh;
		margin: auto;
		padding: 6.4rem 2.4rem 0 2.4rem;
	}
`
