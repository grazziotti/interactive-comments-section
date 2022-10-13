import React from 'react'
import { commentType } from '../../types/commentType'
import { updateScoreType } from '../../types/updateScoreType'
import { userType } from '../../types/userType'
import CommentContainer from '../CommentContainer'

import { Container } from './styles'

interface Props {
	commentData: commentType
	currentUser: userType
	onUpdateScore: updateScoreType
}

const Comment: React.FC<Props> = ({
	commentData,
	currentUser,
	onUpdateScore,
}: Props) => {
	return (
		<Container>
			<CommentContainer
				commentData={commentData}
				currentUser={currentUser}
				onUpdateScore={onUpdateScore}
			/>
			<div className='comment-replies'>
				{commentData.replies.map(replyData => (
					<CommentContainer
						commentData={replyData}
						key={replyData.id}
						replying
						currentUser={currentUser}
						onUpdateScore={onUpdateScore}
					/>
				))}
			</div>
		</Container>
	)
}

export default Comment
