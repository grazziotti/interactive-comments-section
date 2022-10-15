import React, { useState } from 'react'
import { userType } from '../../types/userType'

import { Container } from './styles'

interface Props {
	currentUser: userType
	onAddComment: (content: string) => void
}

const AddComment: React.FC<Props> = ({ currentUser, onAddComment }: Props) => {
	const [comment, setComment] = useState('')

	const handleTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setComment(event.target.value)
	}

	const isEmptyOrSpaces = (str: string) => {
		return str === null || str.match(/^ *$/) !== null
	}

	const addComment = () => {
		if (!isEmptyOrSpaces(comment.trim())) {
			onAddComment(comment.trim())
			setComment('')
		}
	}

	return (
		<Container>
			<img
				src={currentUser.image.png}
				alt={`${currentUser.username} profile pic`}
			/>
			<textarea
				className='comment-textarea'
				placeholder='Add a comment...'
				value={comment}
				onChange={handleTextArea}
			/>
			<div className='btn-container'>
				<button onClick={addComment}>SEND</button>
			</div>
		</Container>
	)
}

export default AddComment
