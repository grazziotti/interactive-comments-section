import styled from 'styled-components'
import { colors, font } from '../../styles/variables'

export const Container = styled.div`
	.comment-area {
		display: flex;
		gap: 2.4rem;
		padding: 2.4rem;
		margin-top: 2rem;
		border-radius: 1rem;
		background-color: ${colors.white};

		.comment-block {
			width: 100%;
			max-width: 62.1rem;

			.comment-header {
				display: flex;
				align-items: center;
				margin-bottom: 1rem;

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

				.comment-btn-area {
					display: flex;
					align-items: center;
					margin-left: auto;

					gap: 0 2.2rem;
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
	}
`
