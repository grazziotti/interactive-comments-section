import React, { useEffect, useState } from 'react'
import { addCommentType } from '../../types/addCommentType'

import { commentType } from '../../types/commentType'
import { updateCommentType } from '../../types/updateCommentType'
import { updateScoreType } from '../../types/updateScoreType'
import { userType } from '../../types/userType'
import ActionBtn from '../ActionBtn'
import AddComment from '../AddComment'
import CommentBtn from '../CommentBtn'

import CommentScore from '../CommentScore'
import TextArea from '../TextArea'

import { Container } from './styles'

interface Props {
	commentData: commentType
	currentUser: userType
	replying?: boolean
	onUpdateScore: updateScoreType
	onReply: addCommentType
	userToReplyId?: number
	onUpdate: updateCommentType
}

const CommentContainer: React.FC<Props> = ({
	commentData,
	currentUser,
	replying,
	onUpdateScore,
	onReply,
	userToReplyId,
	onUpdate,
}: Props) => {
	const [showAddComment, setShowAddComment] = useState(false)
	const [showEditComment, setShowEditComment] = useState(false)
	const [content, setContent] = useState(commentData.content)

	const handleTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContent(event.target.value)
	}

	const isEmptyOrSpaces = (str: string) => {
		return str === null || str.match(/^ *$/) !== null
	}

	const handleUpdateComment = () => {
		if (!isEmptyOrSpaces(content)) {
			if (replying) {
				const hasUsername =
					content.slice(0, `${commentData.replyingTo}`.length + 3) ===
						`@${commentData.replyingTo}, ` ||
					content.slice(0, `${commentData.replyingTo}`.length + 2) ===
						`@${commentData.replyingTo},` ||
					content.slice(0, `${commentData.replyingTo}`.length + 2) ===
						`@${commentData.replyingTo} ` ||
					content.slice(0, `${commentData.replyingTo}`.length + 1) ===
						`@${commentData.replyingTo}`

				if (hasUsername) {
					const newContent = content.substring(
						content.indexOf(`@${commentData.replyingTo},`) +
							`@${commentData.replyingTo},`.length,
					)

					if (!isEmptyOrSpaces(newContent.trim())) {
						setContent(newContent)
						onUpdate(newContent, commentData.id, replying)
						setShowEditComment(false)
					}
				} else {
					onUpdate(content, commentData.id, replying)
					setShowEditComment(false)
				}
			} else {
				onUpdate(content, commentData.id, false)
				setShowEditComment(false)
			}
		}
	}

	useEffect(() => {
		if (showEditComment && replying) {
			const newContent = `@${commentData.replyingTo},${content}`
			setContent(newContent)
		}
	}, [showEditComment])

	return (
		<Container>
			<div className={`comment-area ${replying ? 'reply' : ''}`}>
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
									<CommentBtn
										type='update'
										onClick={() => setShowEditComment(true)}
									/>
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
					{!showEditComment && (
						<p className='comment-body'>
							{replying && <span>@{commentData.replyingTo}</span>}
							{content}
						</p>
					)}

					{showEditComment && (
						<div className='comment-body--edit'>
							<TextArea
								value={content}
								onChange={handleTextArea}
								autoFocus
								onFocus={e =>
									e.currentTarget.setSelectionRange(
										e.currentTarget.value.length,
										e.currentTarget.value.length,
									)
								}
							/>
							<div className='btn-container'>
								<ActionBtn
									title={'UPDATE'}
									onClick={() => handleUpdateComment()}
								/>
							</div>
						</div>
					)}
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
