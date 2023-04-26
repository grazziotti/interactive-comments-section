import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../context/Context'
import { ContextActions } from '../../enums/ContextActions'

import { commentType } from '../../types/commentType'
import { userType } from '../../types/userType'
import { isEmptyOrSpaces } from '../../utils/checkEmptyString'
import { commentPostedTime } from '../../utils/time'

import ActionBtn from '../ActionBtn'
import AddComment from '../AddComment'
import CommentBtn from '../CommentBtn'
import DeleteModal from '../DeleteModal'

import CommentScore from '../CommentScore'
import TextArea from '../TextArea'

import { Container } from './styles'
import { filterReply } from '../../utils/filterReply'

interface Props {
	commentData: commentType
	currentUser: userType
	replying?: boolean
	commentToReplyId?: number
}

const Comment: React.FC<Props> = ({
	commentData,
	currentUser,
	replying,
	commentToReplyId,
}: Props) => {
	const [showComment, setShowComment] = useState(false)
	const [showAddReply, setShowAddReply] = useState(false)
	const [showEditComment, setShowEditComment] = useState(false)
	const [content, setContent] = useState(commentData.content)
	const [editedContent, setEditedContent] = useState('')
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [isUpdateAllowed, setIsUpdateAllowed] = useState(false)

	const { dispatch } = useContext(Context)

	const nextFocusElementRef = useRef<HTMLElement | null>(null)

	const [time, setTime] = useState('')
	const createdAt = new Date(commentData.createdAt)
	const today = new Date()

	useEffect(() => {
		const timeout = setTimeout(
			() => {
				const differenceInTime = today.getTime() - createdAt.getTime()
				setTime(commentPostedTime(differenceInTime))
				setShowComment(true)
			},
			replying ? 600 : 200,
		)

		return () => clearTimeout(timeout)
	}, [])

	useEffect(() => {
		if (showEditComment) {
			if (replying) {
				const filteredReply = `@${commentData.replyingTo}, ${content}`

				setEditedContent(filteredReply.replace(/ +(?= )/g, ''))
			} else {
				setEditedContent(content.replace(/ +(?= )/g, ''))
			}
		} else {
			setEditedContent(content.replace(/ +(?= )/g, ''))
		}
	}, [showEditComment])

	useEffect(() => checkUpdateAllowed(), [editedContent])

	const handleEditTextAreaChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		setEditedContent(event.target.value)
	}

	const checkUpdateAllowed = () => {
		if (!isEmptyOrSpaces(editedContent)) {
			if (replying) {
				if (commentData.replyingTo) {
					const filteredReply = filterReply(
						editedContent.trim(),
						commentData.replyingTo,
					)

					if (!isEmptyOrSpaces(filteredReply)) {
						setIsUpdateAllowed(
							filteredReply.trim() !== content.trim(),
						)
						return
					}

					setIsUpdateAllowed(false)
					return
				}

				setIsUpdateAllowed(false)
				return
			} else {
				setIsUpdateAllowed(editedContent.trim() !== content.trim())
				return
			}
		}

		setIsUpdateAllowed(false)
		return
	}

	const updateComment = () => {
		if (!isUpdateAllowed) return

		dispatch({
			type: ContextActions.updateComment,
			payload: {
				id: commentData.id,
				newContent: editedContent.trim(),
			},
		})

		setContent(editedContent.trim())
		setShowEditComment(false)
	}

	const updateReply = () => {
		if (!isUpdateAllowed) return

		if (!commentData.replyingTo) return

		const filteredComment = filterReply(
			editedContent.trim(),
			commentData.replyingTo,
		)

		dispatch({
			type: ContextActions.updateReply,
			payload: {
				commentId: commentToReplyId,
				replyId: commentData.id,
				newContent: filteredComment.trim(),
			},
		})

		setContent(filteredComment.trim())
		setShowEditComment(false)
	}

	const handleDeleteBtnClick = () => {
		if (commentData.user.username === currentUser.username) {
			openDeleteModal()
		}
	}

	const handleReplyBtnClick = () => {
		setShowAddReply(!showAddReply)
	}

	const handleEditBtnClick = () => {
		if (commentData.user.username === currentUser.username) {
			checkUpdateAllowed()
			setShowEditComment(!showEditComment)
		}
	}

	const openDeleteModal = () => {
		setShowDeleteModal(true)

		if (document.activeElement) {
			nextFocusElementRef.current = document.activeElement as HTMLElement
		}
	}

	const closeDeleteModal = (deleted: boolean) => {
		setShowDeleteModal(false)

		if (!deleted) nextFocusElementRef.current?.focus()
	}

	return (
		<Container>
			<div
				className={`comment-area ${replying ? 'reply' : ''} ${
					showComment ? 'show' : ''
				} `}
			>
				<div className='comment-score'>
					<CommentScore
						commentData={commentData}
						currentUser={currentUser}
						replying={replying ? true : false}
						parentCommentId={commentToReplyId}
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
										aria-haspopup='dialog'
										aria-expanded={
											showDeleteModal ? 'true' : 'false'
										}
										aria-controls='delete-modal'
										aria-label='delete comment'
									/>
									<CommentBtn
										type='edit'
										onClick={handleEditBtnClick}
										aria-label='edit comment'
									/>
								</>
							) : (
								<CommentBtn
									type='reply'
									onClick={handleReplyBtnClick}
									aria-haspopup='dialog'
									aria-expanded={
										showAddReply ? 'true' : 'false'
									}
									aria-controls='addComment'
									aria-label='reply comment'
								/>
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
									className={isUpdateAllowed ? 'active' : ''}
									title='UPDATE'
									onClick={
										replying ? updateReply : updateComment
									}
								/>
							</div>
						</div>
					)}
					<div className='comment-footer'>
						<CommentScore
							commentData={commentData}
							currentUser={currentUser}
							replying={replying ? true : false}
							parentCommentId={commentToReplyId}
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
											setShowAddReply(!showAddReply)
										}
									/>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
			{showAddReply && (
				<AddComment
					currentUser={currentUser}
					type={'reply'}
					commentToReplyId={commentToReplyId}
					replyingTo={commentData.user.username}
					onDone={() => setShowAddReply(false)}
				/>
			)}
			{showDeleteModal && (
				<DeleteModal
					commentId={commentData.id}
					replying={replying ? true : false}
					parentCommentId={commentToReplyId}
					onDone={closeDeleteModal}
				/>
			)}
		</Container>
	)
}

export default Comment
