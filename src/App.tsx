import React, { useEffect, useState } from 'react'

import { Container } from './AppStyles'
import AddComment from './components/AddComment'
import Comment from './components/Comment'
import { GlobalStyles } from './styles/global'
import { commentType } from './types/commentType'
import { updateScoreType } from './types/updateScoreType'
import { userType } from './types/userType'

const App: React.FC = () => {
	const [currentUser, setCurrentUser] = useState<userType>()
	const [comments, setComments] = useState<commentType[]>()

	useEffect(() => {
		fetch('../data/data.json')
			.then(res => res.json())
			.then(data => {
				setCurrentUser(data.currentUser)

				const localStorageComments = localStorage.getItem('comments')

				if (localStorageComments) {
					setComments(JSON.parse(localStorageComments))
				} else {
					localStorage.setItem(
						'comments',
						JSON.stringify(data.comments),
					)
					setComments(data.comments)
				}
			})
	}, [])

	useEffect(() => {
		if (comments) {
			localStorage.setItem('comments', JSON.stringify(comments))
		}
	}, [comments])

	const handleUpdateScore: updateScoreType = (...args) => {
		const [commentId, method, newScore, replying] = args
		if (comments) {
			if (!replying) {
				const newComments = comments.map(comment => {
					if (comment.id === commentId) {
						return updateCommentScore(comment, method, newScore)
					}

					return comment
				})

				setComments(newComments)
			} else {
				const newComments = comments.map(comment => {
					const newReplies = comment.replies.map(reply => {
						if (reply.id === commentId) {
							return updateCommentScore(reply, method, newScore)
						}

						return reply
					})

					comment.replies = newReplies
					return comment
				})

				setComments(newComments)
			}
		}
	}

	const updateCommentScore = (
		comment: commentType,
		method: 'upVote' | 'downVote',
		newScore: number,
	) => {
		const alreadyVote =
			comment.voted === undefined || comment.voted === false

		if (alreadyVote) {
			if (method === 'upVote') {
				comment = {
					...comment,
					score: newScore,
					voted: true,
				}
			}
		} else {
			if (method === 'downVote') {
				comment = {
					...comment,
					score: newScore,
					voted: false,
				}
			}
		}

		return comment
	}

	const handleAddComment = (content: string) => {
		if (comments && currentUser) {
			const commentListLength = getCommentListLength()

			if (!commentListLength) return

			const newComments = [
				...comments,
				{
					id: commentListLength + 1,
					content: content,
					createdAt: '1 month ago',
					score: 0,
					user: currentUser,
					replies: [],
				},
			]

			setComments(newComments)
		}
	}

	const getCommentListLength = () => {
		if (comments) {
			const commentListLength = comments.reduce((acc, comment) => {
				acc = acc + (comment.replies.length + 1)
				return acc
			}, 0)

			return commentListLength
		}
	}

	return (
		<Container>
			<GlobalStyles />
			<div className='app-container'>
				{comments && currentUser && (
					<>
						<div className='comment-area'>
							{comments.map(commentData => (
								<Comment
									key={commentData.id}
									commentData={commentData}
									currentUser={currentUser}
									onUpdateScore={handleUpdateScore}
								/>
							))}
						</div>
						<AddComment
							currentUser={currentUser}
							onAddComment={handleAddComment}
						/>
					</>
				)}
			</div>
		</Container>
	)
}

export default App
