import React from 'react'
import { userType } from '../../types/userType'

import { Container } from './styles'

interface Props {
	currentUser: userType
}

const AddComment: React.FC<Props> = ({ currentUser }: Props) => {
	return (
		<Container>
			<img
				src={currentUser.image.png}
				alt={`${currentUser.username} avatar`}
			/>
			<textarea
				className='comment-textarea'
				placeholder='Add a comment...'
			></textarea>
			<div className='btn-container'>
				<button>SEND</button>
			</div>
		</Container>
	)
}

export default AddComment
