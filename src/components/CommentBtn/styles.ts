import styled from 'styled-components'
import { colors, font } from '../../styles/variables'

export const Container = styled.button`
	.reply,
	.edit,
	.delete {
		display: flex;
		align-items: center;
		font-size: ${font.size.body};
		font-weight: ${font.weight.bold};
		transition: all 0.3s;

		svg path {
			transition: all 0.3s;
		}

		svg {
			margin-right: 0.6rem;
		}
	}

	.reply,
	.edit {
		color: ${colors.moderateBlue};
	}

	.delete {
		color: ${colors.softRed};
	}

	&:hover {
		.reply,
		.edit {
			color: ${colors.lightGrayishBlue};
		}

		.delete {
			color: ${colors.paleRed};
		}

		.reply svg path,
		.edit svg path {
			fill: ${colors.lightGrayishBlue};
		}

		.delete svg path {
			fill: ${colors.paleRed};
		}
	}
`
