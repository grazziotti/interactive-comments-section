import React from 'react'

import { ReactComponent as IconPlus } from '../../assets/images/icon-plus.svg'
import { ReactComponent as IconMinus } from '../../assets/images/icon-minus.svg'

import { Container } from './styles'
import { commentType } from '../../types/commentType'
import { userType } from '../../types/userType'
import { updateScoreType } from '../../types/updateScoreType'

interface Props {
	score: number
	onUpdateScore: updateScoreType
	commentData: commentType
	replying: boolean
	currentUser: userType
}

const CommentScore: React.FC<Props> = ({
	score,
	onUpdateScore,
	commentData,
	replying,
	currentUser,
}: Props) => {
	const upVote = () => {
		if (commentData.user.username !== currentUser.username) {
			const newScore = score + 1
			onUpdateScore(commentData.id, 'upVote', newScore, replying)
		}
	}

	const downVote = () => {
		if (commentData.user.username !== currentUser.username) {
			const newScore = score - 1
			onUpdateScore(commentData.id, 'downVote', newScore, replying)
		}
	}

	return (
		<Container>
			<button
				className={`btn-plus ${commentData.voted ? 'voted' : ''}`}
				aria-label='plus button'
				onClick={upVote}
			>
				<IconPlus />
			</button>
			<p className='score' aria-label={`likes: ${score}`} tabIndex={0}>
				{score}
			</p>
			<button
				className='btn-minus'
				onClick={downVote}
				aria-label='minus button'
			>
				<IconMinus />
			</button>
		</Container>
	)
}

export default CommentScore
