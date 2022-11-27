import styled from 'styled-components'
import { colors, devices, font } from '../../styles/variables'

export const Container = styled.div`
	.comment-area {
		display: flex;
		gap: 2.4rem;
		padding: 2.4rem;
		margin-top: 2rem;
		border-radius: 1rem;
		background-color: ${colors.white};

		.comment-block {
			display: flex;
			flex-direction: column;
			width: 100%;
			max-width: 62.1rem;
			gap: 1rem;

			.comment-header {
				display: flex;
				align-items: center;

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
			}

			.comment-btn-area {
				display: flex;
				align-items: center;
				margin-left: auto;

				gap: 0 2.2rem;
			}

			.comment-body--edit {
				display: flex;
				flex-direction: column;
				gap: 1rem;

				.btn-container {
					display: flex;
					justify-content: end;
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

			.comment-footer {
				display: none;
			}
		}
	}

	.comment-area.reply {
		.comment-block {
			max-width: 52.7rem;
		}
	}

	@media (max-width: ${devices.mobile}) {
		.comment-area {
			padding: 1.6rem;

			.comment-score {
				display: none;
			}

			.comment-block {
				.comment-header {
					.comment-btn-area {
						display: none;
					}
				}

				.comment-footer {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
		}
	}
`
