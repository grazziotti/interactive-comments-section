import React, { useContext } from 'react'
import { Context } from '../../context/Context'
import { ContextActions } from '../../enums/ContextActions'

import { Container } from './styles'

interface Props {
	commentId: number
	replying: boolean
	parentCommentId?: number
	onDone: () => void
}

const DeleteModal: React.FC<Props> = ({
	commentId,
	replying,
	parentCommentId,
	onDone,
}: Props) => {
	const { dispatch } = useContext(Context)

	const handleDeleteBtnClick = () => {
		if (!replying) {
			deleteComment()
		} else if (parentCommentId) {
			deleteReply()
		}

		onDone()
	}

	const deleteComment = () => {
		dispatch({
			type: ContextActions.deleteComment,
			payload: {
				id: commentId,
			},
		})
	}

	const deleteReply = () => {
		dispatch({
			type: ContextActions.deleteReply,
			payload: {
				replyId: commentId,
				parentCommentId,
			},
		})
	}

	return (
		<Container>
			<div className='modal'>
				<h2 className='header'>Delete comment</h2>
				<p className='body'>
					Are you sure you want to delete this comment? This will
					remove the comment and can't be undone.
				</p>
				<div className='footer'>
					<button
						className='cancel'
						onClick={() => onDone()}
						autoFocus
					>
						no, cancel
					</button>
					<button className='delete' onClick={handleDeleteBtnClick}>
						yes, delete
					</button>
				</div>
			</div>
		</Container>
	)
}

export default DeleteModal
