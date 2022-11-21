import styled from 'styled-components'
import { colors, font } from '../../styles/variables'

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.3);

	.modal {
		display: flex;
		flex-direction: column;
		max-width: 40rem;
		gap: 1.6rem;
		padding: 3.2rem;
		border-radius: 1rem;
		background-color: ${colors.white};

		.header {
			font-size: 2.4rem;
			font-weight: ${font.weight.medium};
			color: ${colors.darkBlue};
		}

		.body {
			font-size: ${font.size.body};
			line-height: 1.5;
			color: ${colors.grayishBlue};
		}

		.footer {
			display: flex;
			justify-content: space-between;

			button {
				min-width: 16rem;
				padding: 1.5rem 3rem;
				font-size: ${font.size.body};
				font-weight: ${font.weight.medium};
				text-transform: uppercase;
				border-radius: 1rem;
				color: ${colors.white};
				transition: all 0.3s;

				&:hover {
					opacity: 0.65;
				}
			}

			.cancel {
				background-color: ${colors.grayishBlue};
			}

			.delete {
				background-color: ${colors.softRed};
			}
		}
	}
`
