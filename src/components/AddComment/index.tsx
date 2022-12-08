import React, { useEffect, useState } from 'react'
import { addCommentType } from '../../types/addCommentType'
import { userType } from '../../types/userType'
import { isEmptyOrSpaces } from '../../utils/checkEmptyString'
import ActionBtn from '../ActionBtn'
import TextArea from '../TextArea'

import { Container } from './styles'

interface Props {
	currentUser: userType
	type: 'send' | 'reply'
	onAddComment: addCommentType
	userToReplyId?: number
	replyingTo?: string
	onDone?: () => void
}

const AddComment: React.FC<Props> = ({
	currentUser,
	onAddComment,
	type,
	userToReplyId,
	replyingTo,
	onDone,
}: Props) => {
	const [comment, setComment] = useState('')
	const [showComponent, setShowComponent] = useState(false)

	const handleTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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

	const addComment = () => {
		if (!isEmptyOrSpaces(comment.trim())) {
			onAddComment(comment.trim())
			setComment('')
		}
	}

	const replyComment = () => {
		if (userToReplyId && replyingTo) {
			if (!isEmptyOrSpaces(comment.trim())) {
				if (
					comment.slice(0, `${replyingTo}`.length + 2) ===
					`@${replyingTo},`
				) {
					const newComment = comment.substring(
						comment.indexOf(`@${replyingTo},`) +
							`@${replyingTo},`.length,
					)

					if (!isEmptyOrSpaces(newComment.trim()))
						onAddComment(
							newComment.trim(),
							userToReplyId,
							replyingTo,
						)
				} else {
					onAddComment(comment.trim(), userToReplyId, replyingTo)
				}
			}
		}

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
					onChange={handleTextArea}
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
						onClick={type == 'send' ? addComment : replyComment}
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
							onClick={type == 'send' ? addComment : replyComment}
						/>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default AddComment
