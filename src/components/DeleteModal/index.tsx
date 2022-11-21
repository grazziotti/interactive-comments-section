import React from 'react'

import { Container } from './styles'

interface Props {
	onCancel: () => void
	onDelete: () => void
}

const DeleteModal: React.FC<Props> = ({ onCancel, onDelete }: Props) => {
	return (
		<Container>
			<div className='modal'>
				<h2 className='header'>Delete comment</h2>
				<p className='body'>
					Are you sure you want to delete this comment? This will
					remove the comment and can't be undone.
				</p>
				<div className='footer'>
					<button className='cancel' onClick={() => onCancel()}>
						no, cancel
					</button>
					<button className='delete' onClick={() => onDelete()}>
						yes, delete
					</button>
				</div>
			</div>
		</Container>
	)
}

export default DeleteModal
