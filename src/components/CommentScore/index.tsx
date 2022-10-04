import React from 'react'

import { ReactComponent as IconPlus } from '../../assets/images/icon-plus.svg'
import { ReactComponent as IconMinus } from '../../assets/images/icon-minus.svg'

import { Container } from './styles'

const CommentScore: React.FC = () => {
	return (
		<Container>
			<button className='btn-plus'>
				<IconPlus />
			</button>
			<div className='score'>12</div>
			<button className='btn-minus'>
				<IconMinus />
			</button>
		</Container>
	)
}

export default CommentScore
