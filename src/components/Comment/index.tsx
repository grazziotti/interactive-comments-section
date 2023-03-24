import React from 'react'
import { addCommentType } from '../../types/addCommentType'
import { commentType } from '../../types/commentType'
import { updateCommentType } from '../../types/updateCommentType'
import { updateScoreType } from '../../types/updateScoreType'
import { userType } from '../../types/userType'
import CommentContainer from '../CommentContainer'

import { Container } from './styles'

interface Props extends React.HTMLProps<HTMLDivElement> {
	commentData: commentType
	currentUser: userType
	onUpdateScore: updateScoreType
	onReply: addCommentType
	onUpdate: updateCommentType
	onOpenDeleteModal: (commentId: number) => void
}

const Comment: React.FC<Props> = ({
	commentData,
	currentUser,
	onUpdateScore,
	onReply,
	onUpdate,
	onOpenDeleteModal,
}: Props) => {
	return (
		<Container>
			<CommentContainer
				commentData={commentData}
				currentUser={currentUser}
				onUpdateScore={onUpdateScore}
				onReply={onReply}
				onUpdate={onUpdate}
				onOpenDeleteModal={onOpenDeleteModal}
				userToReplyId={commentData.id}
			/>
			<ul className='comment-replies'>
				{commentData.replies?.map(replyData => (
					<li key={replyData.id}>
						<CommentContainer
							commentData={replyData}
							currentUser={currentUser}
							onUpdateScore={onUpdateScore}
							onReply={onReply}
							onUpdate={onUpdate}
							onOpenDeleteModal={onOpenDeleteModal}
							replying
							userToReplyId={commentData.id}
						/>
					</li>
				))}
			</ul>
		</Container>
	)
}

export default Comment
