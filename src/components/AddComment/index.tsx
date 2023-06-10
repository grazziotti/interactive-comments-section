import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/Context'
import { ContextActions } from '../../enums/ContextActions'
import { userType } from '../../types/userType'
import { isEmptyOrSpaces } from '../../utils/checkEmptyString'
import { getCurrentDate } from '../../utils/getCurrentDate'
import { getLastCommentId } from '../../utils/getLastCommentId'

import ActionBtn from '../ActionBtn'
import TextArea from '../TextArea'

import { Container } from './styles'
import { filterReply } from '../../utils/filterReply'

interface Props {
	currentUser: userType
	type: 'send' | 'reply'
	commentToReplyId?: number
	replyingTo?: string
	onDone?: () => void
}

const AddComment: React.FC<Props> = ({
	currentUser,
	type,
	commentToReplyId,
	replyingTo,
	onDone,
}: Props) => {
	const [comment, setComment] = useState('')
	const [showComponent, setShowComponent] = useState(false)
	const [isCommentAllowed, setIsCommentAllowed] = useState(false)

	const { state, dispatch } = useContext(Context)

	const handleTextAreaChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		setComment(event.target.value)
	}

	useEffect(() => checkCommentAllowed(), [comment])

	useEffect(() => {
		if (type === 'reply') {
			setComment(`@${replyingTo}, `)
		}

		const timeout = setTimeout(() => {
			setShowComponent(true)
		}, 200)

		return () => clearTimeout(timeout)
	}, [])

	const checkCommentAllowed = () => {
		if (type === 'send') {
			setIsCommentAllowed(!isEmptyOrSpaces(comment.trim()))
			return
		} else if (type === 'reply') {
			if (replyingTo) {
				const filteredReply = filterReply(comment.trim(), replyingTo)
				setIsCommentAllowed(!isEmptyOrSpaces(filteredReply.trim()))
				return
			}

			return
		}
	}

	const handleAddComment = () => {
		if (!isCommentAllowed) return

		const lastCommentId = getLastCommentId(state.comments)

		if (!lastCommentId) return

		dispatch({
			type: ContextActions.addComment,
			payload: {
				id: lastCommentId + 1,
				content: comment,
				createdAt: getCurrentDate(),
				score: 0,
				user: currentUser,
				replies: [],
			},
		})

		setComment('')
	}

	const handleAddReply = () => {
		if (!isCommentAllowed) return
		if (!replyingTo) return

		const lastCommentId = getLastCommentId(state.comments)
		const filteredReplyComment = filterReply(comment.trim(), replyingTo)

		if (!lastCommentId) return

		dispatch({
			type: ContextActions.addReply,
			payload: {
				id: lastCommentId + 1,
				content: filteredReplyComment,
				createdAt: getCurrentDate(),
				score: 0,
				user: currentUser,
				commentToReplyId,
				replyingTo,
			},
		})

		setComment('')
		if (onDone) onDone()
	}

	return (
		<Container
			id='addComment'
			role={type === 'reply' ? 'dialog' : undefined}
			aria-modal={type === 'reply' ? 'true' : undefined}
		>
			<div className={`addComment-area ${showComponent ? 'show' : ''}`}>
				<div className='profile-avatar'>
					<img
						src={currentUser.image.png}
						alt={`${currentUser.username} profile pic`}
					/>
				</div>
				<TextArea
					placeholder='Add a comment...'
					value={comment}
					aria-label={
						type === 'send' ? 'add a comment' : 'add a reply'
					}
					onChange={handleTextAreaChange}
					autoFocus={type === 'reply'}
					onFocus={e =>
						e.currentTarget.setSelectionRange(
							e.currentTarget.value.length,
							e.currentTarget.value.length,
						)
					}
				/>
				<div className='btn-container'>
					<ActionBtn
						className={isCommentAllowed ? 'active' : ''}
						title={type.toUpperCase()}
						onClick={
							type == 'send' ? handleAddComment : handleAddReply
						}
					/>
				</div>
				<div className='addComment-footer'>
					<div className='profile-avatar'>
						<img
							src={currentUser.image.png}
							alt={`${currentUser.username} profile pic`}
						/>
					</div>
					<div className='btn-container'>
						<ActionBtn
							className={isCommentAllowed ? 'active' : ''}
							title={type.toUpperCase()}
							onClick={
								type == 'send'
									? handleAddComment
									: handleAddReply
							}
						/>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default AddComment
