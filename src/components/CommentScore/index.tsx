import React, { useContext } from 'react'

import { ReactComponent as IconPlus } from '../../assets/images/icon-plus.svg'
import { ReactComponent as IconMinus } from '../../assets/images/icon-minus.svg'

import { Container } from './styles'
import { commentType } from '../../types/commentType'
import { userType } from '../../types/userType'
import { Context } from '../../context/Context'
import { ContextActions } from '../../enums/ContextActions'

interface Props {
	commentData: commentType
	replying: boolean
	parentCommentId?: number
	currentUser: userType
}

const CommentScore: React.FC<Props> = ({
	commentData,
	replying,
	parentCommentId,
	currentUser,
}: Props) => {
	const { dispatch } = useContext(Context)

	const handleUpdateScore = (method: 'upVote' | 'downVote') => {
		if (commentData.user.username === currentUser.username) return

		if (!replying) {
			dispatch({
				type: ContextActions.updateCommentScore,
				payload: {
					id: commentData.id,
					method,
				},
			})
		} else {
			dispatch({
				type: ContextActions.updateReplyScore,
				payload: {
					commentId: parentCommentId,
					replyId: commentData.id,
					method,
				},
			})
		}
	}

	return (
		<Container>
			<button
				className={`btn-plus ${commentData.voted ? 'voted' : ''}`}
				aria-label='plus button'
				onClick={() => handleUpdateScore('upVote')}
			>
				<IconPlus />
			</button>
			<p className='score' tabIndex={0}>
				{commentData.score}
			</p>
			<button
				className='btn-minus'
				onClick={() => handleUpdateScore('downVote')}
				aria-label='minus button'
			>
				<IconMinus />
			</button>
		</Container>
	)
}

export default CommentScore
