import styled from 'styled-components'
import { colors, font } from '../../styles/variables'

export const Container = styled.div`
	display: flex;
	gap: 2.4rem;
	padding: 2.4rem;
	margin-top: 2.4rem;
	border-radius: 1rem;
	background-color: ${colors.white};

	.comment-block {
		width: 100%;

		.comment-header {
			display: flex;
			align-items: center;
			margin-bottom: 1.6rem;

			img {
				width: 30px;
				height: 30px;
			}

			.username {
				margin-left: 1.1rem;
				font-size: ${font.size.body};
				font-weight: ${font.weight.medium};
				color: ${colors.darkBlue};
			}

			.comment-posted-time {
				margin-left: 1.6rem;
				font-size: ${font.size.body};
				color: ${colors.grayishBlue};
			}

			button {
				display: flex;
				align-items: center;
				margin-left: auto;
				font-size: ${font.size.body};
				font-weight: ${font.weight.bold};
				color: ${colors.moderateBlue};
				transition: all 0.3s;

				&:hover {
					color: ${colors.lightGrayishBlue};
				}

				&:hover svg path {
					fill: ${colors.lightGrayishBlue};
				}

				svg path {
					transition: all 0.3s;
				}

				svg {
					margin-right: 0.6rem;
				}
			}
		}

		.comment-body {
			max-width: 58rem;
			font-size: ${font.size.body};
			word-wrap: break-word;
			word-break: break-all;
			line-height: 1.5;
			color: ${colors.grayishBlue};
		}
	}
`
