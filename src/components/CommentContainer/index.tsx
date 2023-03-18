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
	const [editedContent, setEditedContent] = useState('')

	const [time, setTime] = useState('')
	const createdAt = new Date(commentData.createdAt)
	const today = new Date()

	const handleEditTextAreaChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		setEditedContent(event.target.value)
	}

	const handleEditActionBtnClick = () => {
		if (commentData.user.username === currentUser.username) {
			if (!isEmptyOrSpaces(editedContent)) {
				if (replying) {
					const hasUsername =
						editedContent.slice(
							0,
							`${commentData.replyingTo}`.length + 3,
						) === `@${commentData.replyingTo}, ` ||
						editedContent.slice(
							0,
							`${commentData.replyingTo}`.length + 2,
						) === `@${commentData.replyingTo},` ||
						editedContent.slice(
							0,
							`${commentData.replyingTo}`.length + 2,
						) === `@${commentData.replyingTo} ` ||
						editedContent.slice(
							0,
							`${commentData.replyingTo}`.length + 1,
						) === `@${commentData.replyingTo}`

					if (hasUsername) {
						const newContent = editedContent.substring(
							editedContent.indexOf(
								`@${commentData.replyingTo},`,
							) + `@${commentData.replyingTo},`.length,
						)

						if (!isEmptyOrSpaces(newContent.trim())) {
							setContent(newContent.trim())
							onUpdate(newContent, commentData.id, true)
						}
					} else {
						setContent(editedContent.trim())
						onUpdate(editedContent, commentData.id, true)
					}
				} else {
					setContent(editedContent.trim())
					onUpdate(editedContent, commentData.id, false)
				}

				setShowEditComment(false)
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
		if (showEditComment) {
			if (replying) {
				const newContent = `@${commentData.replyingTo}, ${content}`

				setEditedContent(newContent.replace(/ +(?= )/g, ''))
			} else {
				setEditedContent(content.replace(/ +(?= )/g, ''))
			}
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
							tabIndex={0}
						/>
						<div className='username' tabIndex={0}>
							{commentData.user.username}
						</div>
						{commentData.user.username === currentUser.username && (
							<span className='you-tag' tabIndex={0}>
								you
							</span>
						)}
						<span className='comment-posted-time' tabIndex={0}>
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
										type='edit'
										onClick={() =>
											setShowEditComment(!showEditComment)
										}
									/>
								</>
							) : (
								<>
									<CommentBtn
										type='reply'
										onClick={() =>
											setShowAddComment(!showAddComment)
										}
									/>
								</>
							)}
						</div>
					</div>
					{!showEditComment && (
						<p className='comment-body' tabIndex={0}>
							{replying && <span>@{commentData.replyingTo}</span>}
							{content}
						</p>
					)}

					{showEditComment && (
						<div className='comment-body--edit'>
							<TextArea
								value={editedContent}
								onChange={handleEditTextAreaChange}
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
									onClick={handleEditActionBtnClick}
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
										type='edit'
										onClick={() =>
											setShowEditComment(!showEditComment)
										}
									/>
								</>
							) : (
								<>
									<CommentBtn
										type='reply'
										onClick={() =>
											setShowAddComment(!showAddComment)
										}
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
