import React from 'react'
import { commentType } from '../../types/commentType'
import { userType } from '../../types/userType'
import CommentContainer from '../CommentContainer'

import { Container } from './styles'

interface Props {
	commentData: commentType
	currentUser: userType
}

const Comment: React.FC<Props> = ({ commentData, currentUser }: Props) => {
	return (
		<Container>
			<CommentContainer
				commentData={commentData}
				currentUser={currentUser}
			/>
			<div className='comment-replies'>
				{commentData.replies.map(replyData => (
					<CommentContainer
						commentData={replyData}
						key={replyData.id}
						replying
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	)
}

export default Comment
