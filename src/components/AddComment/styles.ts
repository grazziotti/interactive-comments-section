import styled from 'styled-components'
import { colors, devices } from '../../styles/variables'

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

	.addComment-footer {
		display: none;
	}

	@media (max-width: ${devices.mobile}) {
		flex-direction: column;

		.profile-avatar {
			display: none;
		}

		.btn-container {
			display: none;
		}

		.addComment-footer {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.profile-avatar {
				display: flex;
			}

			.btn-container {
				display: flex;
			}
		}
	}
`
