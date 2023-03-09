import React, { useEffect, useState } from 'react'

import { Container } from './AppStyles'
import AddComment from './components/AddComment'
import Comment from './components/Comment'
import DeleteModal from './components/DeleteModal'
import { GlobalStyles } from './styles/global'
import { addCommentType } from './types/addCommentType'
import { commentType } from './types/commentType'
import { updateCommentType } from './types/updateCommentType'
import { updateScoreType } from './types/updateScoreType'
import { userType } from './types/userType'

const App: React.FC = () => {
	const [currentUser, setCurrentUser] = useState<userType>()
	const [comments, setComments] = useState<commentType[]>()
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [commentToDelete, setCommentToDelete] = useState(-1)

	const getMonthNames = () => [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]

	const getNow = () => {
		const date = new Date()

		return `${date.getDate()} ${
			getMonthNames()[date.getMonth()]
		} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
	}

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

	useEffect(() => {
		const htmlTag = document.querySelector('html')
		if (htmlTag !== null)
			htmlTag.style.overflow = showDeleteModal ? 'hidden' : 'scroll'
	}, [showDeleteModal])

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
					const newReplies = comment.replies?.map(reply => {
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
		const alreadyVoted =
			comment.voted !== undefined && comment.voted !== false

		if (!alreadyVoted) {
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

	const handleAddComment: addCommentType = (...args) => {
		const [content, userToReplyId, replyingTo] = args
		getNow()

		if (userToReplyId && replyingTo) {
			replyComment(content, userToReplyId, replyingTo)
		} else {
			addComment(content)
		}
	}

	const addComment = (content: string) => {
		if (comments && currentUser) {
			const lastCommentId = getLastCommentId()

			if (!lastCommentId) return

			const newComments = [
				...comments,
				{
					id: lastCommentId + 1,
					content: content,
					createdAt: getNow(),
					score: 0,
					user: currentUser,
					replies: [],
				},
			]

			setComments(newComments)
		}
	}

	const replyComment = (
		content: string,
		userReplyToId: number,
		replyingTo: string,
	) => {
		if (comments && currentUser) {
			if (userReplyToId && replyingTo) {
				const lastCommentId = getLastCommentId()

				if (!lastCommentId) return

				const newComments = comments.map(comment => {
					if (comment.id === userReplyToId) {
						comment.replies?.push({
							id: lastCommentId + 1,
							content,
							createdAt: getNow(),
							replyingTo,
							score: 0,
							user: currentUser,
						})
					}
					return comment
				})

				setComments(newComments)
			}
		}
	}

	const updateComment: updateCommentType = (...args) => {
		const [content, commentId, replying] = args

		if (comments) {
			if (!replying) {
				const newComments = comments.map(comment => {
					if (comment.id === commentId) {
						comment.content = content
					}

					return comment
				})

				setComments(newComments)
			} else {
				const newComments = comments.map(comment => {
					const newReplies = comment.replies?.map(reply => {
						if (reply.id === commentId) {
							reply.content = content
						}

						return reply
					})
					if (newReplies) {
						comment.replies = newReplies
					}

					return comment
				})

				setComments(newComments)
			}
		}
	}

	const openDeleteModal = (commentId: number) => {
		setShowDeleteModal(true)
		setCommentToDelete(commentId)
	}

	const closeDeleteModal = () => {
		setShowDeleteModal(false)
		setCommentToDelete(-1)
	}

	const deleteComment = () => {
		const newComments = comments?.filter(comment => {
			if (comment.id === commentToDelete) {
				return
			}

			const newReplies = comment.replies?.filter(reply => {
				if (reply.id === commentToDelete) {
					return
				}

				return reply
			})

			comment.replies = newReplies

			return comment
		})

		setComments(newComments)
		closeDeleteModal()
	}

	const getLastCommentId = () => {
		if (comments) {
			const lastCommentId = comments.reduce((acc, comment) => {
				if (comment.replies && comment.replies.length > 0) {
					const lastReplyId = comment.replies.slice(-1)[0].id

					acc = lastReplyId > acc ? lastReplyId : acc

					return acc
				}

				acc = comment.id > acc ? comment.id : acc
				return acc
			}, 0)

			return lastCommentId
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
									onReply={handleAddComment}
									onUpdate={updateComment}
									onOpenDeleteModal={openDeleteModal}
								/>
							))}
						</div>
						<AddComment
							currentUser={currentUser}
							onAddComment={handleAddComment}
							type={'send'}
						/>
						{showDeleteModal && (
							<DeleteModal
								onCancel={closeDeleteModal}
								onDelete={deleteComment}
							/>
						)}
					</>
				)}
			</div>
		</Container>
	)
}

export default App
