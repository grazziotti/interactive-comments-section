import React from 'react'
import CommentContainer from '../CommentContainer'

import { Container } from './styles'

const Comment: React.FC = () => {
	return (
		<Container>
			<CommentContainer />
			<div className='comment-reply'></div>
		</Container>
	)
}

export default Comment
