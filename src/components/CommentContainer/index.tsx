import React, { useEffect, useState } from 'react'
import { addCommentType } from '../../types/addCommentType'

import { commentType } from '../../types/commentType'
import { updateCommentType } from '../../types/updateCommentType'
import { updateScoreType } from '../../types/updateScoreType'
import { userType } from '../../types/userType'
import { isEmptyOrSpaces } from '../../utils/checkEmptyString'
import { commentPostedTime } from '../../utils/time'
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
	onOpenDeleteModal: (commentId: number) => void
}

const CommentContainer: React.FC<Props> = ({
	commentData,
	currentUser,
	replying,
	onUpdateScore,
	onReply,
	userToReplyId,
	onUpdate,
	onOpenDeleteModal,
}: Props) => {
	const [showComment, setShowComment] = useState(false)
	const [showAddComment, setShowAddComment] = useState(false)
	const [showEditComment, setShowEditComment] = useState(false)
	const [content, setContent] = useState(commentData.content)

	const [time, setTime] = useState('')
	const createdAt = new Date(commentData.createdAt)
	const today = new Date()

	const handleTextAreaChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		setContent(event.target.value)
	}

	const handleUpdateActionBtnClick = () => {
		if (commentData.user.username === currentUser.username) {
			if (!isEmptyOrSpaces(content)) {
				if (replying) {
					const hasUsername =
						content.slice(
							0,
							`${commentData.replyingTo}`.length + 3,
						) === `@${commentData.replyingTo}, ` ||
						content.slice(
							0,
							`${commentData.replyingTo}`.length + 2,
						) === `@${commentData.replyingTo},` ||
						content.slice(
							0,
							`${commentData.replyingTo}`.length + 2,
						) === `@${commentData.replyingTo} ` ||
						content.slice(
							0,
							`${commentData.replyingTo}`.length + 1,
						) === `@${commentData.replyingTo}`

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
	}

	const handleDeleteBtnClick = () => {
		if (commentData.user.username === currentUser.username) {
			onOpenDeleteModal(commentData.id)
		}
	}

	useEffect(() => {
		const timeout = setTimeout(
			() => {
				const differenceInTime = today.getTime() - createdAt.getTime()
				setTime(commentPostedTime(differenceInTime))
				setShowComment(true)
			},
			commentData.replyingTo ? 600 : 200,
		)

		return () => clearTimeout(timeout)
	}, [])

	useEffect(() => {
		if (showEditComment && replying) {
			const newContent = `@${commentData.replyingTo},${content}`
			setContent(newContent)
		}
	}, [showEditComment])

	return (
		<Container>
			<div
				className={`comment-area ${replying ? 'reply' : ''} ${
					showComment ? 'show' : ''
				} `}
			>
				<div className='comment-score'>
					<CommentScore
						score={commentData.score}
						onUpdateScore={onUpdateScore}
						commentData={commentData}
						currentUser={currentUser}
						replying={replying ? true : false}
					/>
				</div>
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
							{time + ' ago'}
						</span>
						<div className='comment-btn-area'>
							{commentData.user.username ==
							currentUser.username ? (
								<>
									<CommentBtn
										type='delete'
										onClick={handleDeleteBtnClick}
									/>
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
								onChange={handleTextAreaChange}
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
									onClick={() => handleUpdateActionBtnClick()}
								/>
							</div>
						</div>
					)}
					<div className='comment-footer'>
						<CommentScore
							score={commentData.score}
							onUpdateScore={onUpdateScore}
							commentData={commentData}
							currentUser={currentUser}
							replying={replying ? true : false}
						/>
						<div className='comment-btn-area'>
							{commentData.user.username ==
							currentUser.username ? (
								<>
									<CommentBtn
										type='delete'
										onClick={handleDeleteBtnClick}
									/>
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
