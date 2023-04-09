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

	const { state, dispatch } = useContext(Context)

	const handleTextAreaChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		setComment(event.target.value)
	}

	useEffect(() => {
		if (type === 'reply') {
			setComment(`@${replyingTo}, `)
		}

		const timeout = setTimeout(() => {
			setShowComponent(true)
		}, 200)

		return () => clearTimeout(timeout)
	}, [])

	const filterReply = (comment: string) => {
		if (
			comment.slice(0, `${replyingTo}`.length + 2) === `@${replyingTo},`
		) {
			return comment.substring(
				comment.indexOf(`@${replyingTo},`) + `@${replyingTo},`.length,
			)
		}

		return comment
	}

	const handleAddComment = () => {
		const lastCommentId = getLastCommentId(state.comments)

		if (isEmptyOrSpaces(comment.trim())) {
			return
		}

		if (!lastCommentId) {
			return
		}

		dispatch({
			type: ContextActions.addComment,
			payload: {
				id: lastCommentId + 1,
				content: comment.trim(),
				createdAt: getCurrentDate(),
				score: 0,
				user: currentUser,
				replies: [],
			},
		})

		setComment('')
	}

	const handleAddReply = () => {
		const lastCommentId = getLastCommentId(state.comments)
		const filteredReplyComment = filterReply(comment)

		if (isEmptyOrSpaces(filteredReplyComment.trim())) return

		if (!lastCommentId) return

		dispatch({
			type: ContextActions.addReply,
			payload: {
				id: lastCommentId + 1,
				content: filteredReplyComment.trim(),
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
		<Container className='addComment'>
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
