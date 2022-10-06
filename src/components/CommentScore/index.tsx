import React from 'react'

import { ReactComponent as IconPlus } from '../../assets/images/icon-plus.svg'
import { ReactComponent as IconMinus } from '../../assets/images/icon-minus.svg'

import { Container } from './styles'

interface Props {
	score: number
}

const CommentScore: React.FC<Props> = ({ score }: Props) => {
	return (
		<Container>
			<button className='btn-plus'>
				<IconPlus />
			</button>
			<div className='score'>{score}</div>
			<button className='btn-minus'>
				<IconMinus />
			</button>
		</Container>
	)
}

export default CommentScore
