import React, { useState } from 'react'
import { addCommentType } from '../../types/addCommentType'

import { commentType } from '../../types/commentType'
import { updateScoreType } from '../../types/updateScoreType'
import { userType } from '../../types/userType'
import AddComment from '../AddComment'
import CommentBtn from '../CommentBtn'

import CommentScore from '../CommentScore'

import { Container } from './styles'

interface Props {
	commentData: commentType
	currentUser: userType
	replying?: boolean
	onUpdateScore: updateScoreType
	onReply: addCommentType
	userToReplyId?: number
}

const CommentContainer: React.FC<Props> = ({
	commentData,
	currentUser,
	replying,
	onUpdateScore,
	onReply,
	userToReplyId,
}: Props) => {
	const [showAddComment, setShowAddComment] = useState(false)

	return (
		<Container>
			<div className='comment-area'>
				<CommentScore
					score={commentData.score}
					onUpdateScore={onUpdateScore}
					commentData={commentData}
					currentUser={currentUser}
					replying={replying ? true : false}
				/>
				<div className='comment-block'>
					<div className='comment-header'>
						<img
							src={commentData.user.image.png}
							alt={`${commentData.user.username} profile pic`}
						/>
						<div className='username'>
							{commentData.user.username}
						</div>
						{commentData.user.username === currentUser.username && (
							<span className='you-tag'>you</span>
						)}
						<span className='comment-posted-time'>
							{commentData.createdAt}
						</span>
						<div className='comment-btn-area'>
							{commentData.user.username ==
							currentUser.username ? (
								<>
									<CommentBtn type='delete' />
									<CommentBtn type='update' />
								</>
							) : (
								<>
									<CommentBtn
										type='reply'
										onClick={() => setShowAddComment(true)}
									/>
								</>
							)}
						</div>
					</div>
					<p className='comment-body'>
						{replying && <span>@{commentData.replyingTo}</span>}
						{commentData.content}
					</p>
				</div>
			</div>
			{showAddComment && (
				<AddComment
					currentUser={currentUser}
					onAddComment={onReply}
					type={'reply'}
					userToReplyId={userToReplyId}
					replyingTo={commentData.user.username}
					onDone={() => setShowAddComment(false)}
				/>
			)}
		</Container>
	)
}

export default CommentContainer
