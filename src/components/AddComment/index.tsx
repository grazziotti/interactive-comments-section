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

	const handleTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setComment(event.target.value)
	}

	useEffect(() => {
		if (type === 'reply') {
			setComment(`@${replyingTo}, `)
		}
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
			<img
				src={currentUser.image.png}
				alt={`${currentUser.username} profile pic`}
			/>
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
		</Container>
	)
}

export default AddComment
