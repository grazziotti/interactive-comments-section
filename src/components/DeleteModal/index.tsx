import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../context/Context'
import { ContextActions } from '../../enums/ContextActions'

import { Container } from './styles'

interface Props {
	commentId: number
	replying: boolean
	parentCommentId?: number
	onDone: (deleted: boolean) => void
}

const DeleteModal: React.FC<Props> = ({
	commentId,
	replying,
	parentCommentId,
	onDone,
}: Props) => {
	const { dispatch } = useContext(Context)

	const [showComponent, setShowComponent] = useState(false)

	const button1Ref = useRef<HTMLButtonElement>(null)
	const button2Ref = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowComponent(true)
		}, 10)

		return () => clearTimeout(timeout)
	}, [])

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Tab') {
			if (event.shiftKey) {
				if (document.activeElement === button1Ref.current) {
					event.preventDefault()
					button2Ref.current?.focus()
				}
			} else {
				if (document.activeElement === button2Ref.current) {
					event.preventDefault()
					button1Ref.current?.focus()
				}
			}
		}
	}

	const handleCancelBtnClick = () => {
		setShowComponent(false)
		setTimeout(() => onDone(false), 200)
	}

	const handleDeleteBtnClick = () => {
		if (!replying) {
			deleteComment()
		} else if (parentCommentId) {
			deleteReply()
		}

		onDone(true)
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
		<Container className={`${showComponent ? 'show' : ''}`}>
			<div
				id='delete-modal'
				className={`${showComponent ? 'show' : ''}`}
				role='alertdialog'
				aria-modal='true'
				aria-labelledby='header'
				aria-describedby='body'
				onKeyDown={handleKeyDown}
			>
				<h2 id='header'>Delete comment</h2>
				<p id='body'>
					Are you sure you want to delete this comment? This will
					remove the comment and can't be undone.
				</p>
				<div className='footer'>
					<button
						className='cancel'
						onClick={handleCancelBtnClick}
						autoFocus
						ref={button1Ref}
					>
						no, cancel
					</button>
					<button
						className='delete'
						onClick={handleDeleteBtnClick}
						ref={button2Ref}
					>
						yes, delete
					</button>
				</div>
			</div>
		</Container>
	)
}

export default DeleteModal
