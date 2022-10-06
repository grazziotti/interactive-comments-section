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
				width: 3rem;
				height: 3rem;
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

			.you-tag {
				font-size: 1.3rem;
				font-weight: ${font.weight.medium};
				margin-left: 0.8rem;
				padding: 0.2rem 0.8rem 0.3rem 0.8rem;
				color: ${colors.white};
				background-color: ${colors.moderateBlue};
				border-radius: 0.3rem;
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
			font-size: ${font.size.body};
			word-wrap: break-word;
			line-height: 1.5;
			color: ${colors.grayishBlue};

			span {
				margin-right: 0.4rem;
				font-weight: ${font.weight.medium};
				color: ${colors.moderateBlue};
			}
		}
	}
`
