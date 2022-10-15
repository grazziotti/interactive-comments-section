import React from 'react'

import { commentType } from '../../types/commentType'
import { updateScoreType } from '../../types/updateScoreType'
import { userType } from '../../types/userType'
import CommentBtn from '../CommentBtn'

import CommentScore from '../CommentScore'

import { Container } from './styles'

interface Props {
	commentData: commentType
	currentUser: userType
	replying?: boolean
	onUpdateScore: updateScoreType
}

const CommentContainer: React.FC<Props> = ({
	commentData,
	currentUser,
	replying,
	onUpdateScore,
}: Props) => {
	return (
		<Container>
			<CommentScore
				score={commentData.score}
				onUpdateScore={onUpdateScore}
				commentData={commentData}
				currentUser={currentUser}
				replying={replying ? true : false}
			/>
			<div className='comment-block'>
				<div className='comment-header'>
					<img
						src={commentData.user.image.png}
						alt={`${commentData.user.username} profile pic`}
					/>
					<div className='username'>{commentData.user.username}</div>
					{commentData.user.username === currentUser.username && (
						<span className='you-tag'>you</span>
					)}
					<span className='comment-posted-time'>
						{commentData.createdAt}
					</span>
					<div className='comment-btn-area'>
						{commentData.user.username == currentUser.username ? (
							<>
								<CommentBtn type='delete' />
								<CommentBtn type='update' />
							</>
						) : (
							<>
								<CommentBtn type='reply' />
							</>
						)}
					</div>
				</div>
				<p className='comment-body'>
					{replying && <span>@{commentData.replyingTo}</span>}
					{commentData.content}
				</p>
			</div>
		</Container>
	)
}

export default CommentContainer
