import React from 'react'
import { addCommentType } from '../../types/addCommentType'
import { commentType } from '../../types/commentType'
import { updateScoreType } from '../../types/updateScoreType'
import { userType } from '../../types/userType'
import CommentContainer from '../CommentContainer'

import { Container } from './styles'

interface Props {
	commentData: commentType
	currentUser: userType
	onUpdateScore: updateScoreType
	onReply: addCommentType
}

const Comment: React.FC<Props> = ({
	commentData,
	currentUser,
	onUpdateScore,
	onReply,
}: Props) => {
	return (
		<Container>
			<CommentContainer
				commentData={commentData}
				currentUser={currentUser}
				onUpdateScore={onUpdateScore}
				onReply={onReply}
				userToReplyId={commentData.id}
			/>
			<div className='comment-replies'>
				{commentData.replies?.map(replyData => (
					<CommentContainer
						commentData={replyData}
						currentUser={currentUser}
						onUpdateScore={onUpdateScore}
						onReply={onReply}
						key={replyData.id}
						replying
						userToReplyId={commentData.id}
					/>
				))}
			</div>
		</Container>
	)
}

export default Comment
