import { ContextActions } from '../enums/ContextActions'
import { commentType } from '../types/commentType'
import { reducerActionType } from '../types/reducerActionType'
import { userType } from '../types/userType'

export type CommentType = {
	id: number
	content: string
	createdAt: string
	score: number
	user: userType
	voted?: boolean
	replyingTo?: string
	replies?: commentType[]
}

export const CommentReducer = (
	state: CommentType[],
	action: reducerActionType,
) => {
	switch (action.type) {
		case ContextActions.setComments:
			return action.payload
		case ContextActions.addComment: {
			return [...state, action.payload]
		}
		case ContextActions.updateComment: {
			const { id, content } = action.payload

			return state.map(comment => {
				if (comment.id === id) {
					return { ...comment, content }
				}
				return comment
			})
		}
		case ContextActions.deleteComment: {
			const { id } = action.payload
			return state.filter(comment => comment.id !== id)
		}
		case ContextActions.addReply: {
			return state.map(comment => {
				if (comment.id === action.payload.commentToReplyId) {
					const updatedComment = {
						...comment,
						replies: [...(comment.replies || []), action.payload],
					}
					return updatedComment
				}
				return comment
			})
		}
		case ContextActions.updateReply: {
			const { commentId, replyId, newContent } = action.payload

			return state.map(comment => {
				if (comment.id === commentId) {
					return {
						...comment,
						replies: (comment.replies || []).map(reply => {
							if (reply.id === replyId) {
								return {
									...reply,
									content: newContent,
								}
							}
							return reply
						}),
					}
				}
				return comment
			})
		}
		case ContextActions.deleteReply: {
			const { replyId, parentCommentId } = action.payload

			return state.map(comment => {
				if (comment.id === parentCommentId) {
					return {
						...comment,
						replies: (comment.replies || []).filter(
							reply => reply.id !== replyId,
						),
					}
				} else {
					return comment
				}
			})
		}
		case ContextActions.updateCommentScore: {
			const { id, method } = action.payload

			return state.map(comment => {
				if (comment.id === id) {
					if (!comment.voted) {
						if (method === 'upVote') {
							return {
								...comment,
								score: comment.score + 1,
								voted: true,
							}
						}
					} else {
						if (method === 'downVote') {
							return {
								...comment,
								score: comment.score - 1,
								voted: false,
							}
						}
					}
				}

				return comment
			})
		}
		case ContextActions.updateReplyScore: {
			const { commentId, replyId, method } = action.payload

			return state.map(comment => {
				if (comment.id === commentId) {
					return {
						...comment,
						replies: (comment.replies || []).map(reply => {
							if (reply.id === replyId) {
								if (!reply.voted) {
									if (method === 'upVote') {
										return {
											...reply,
											score: reply.score + 1,
											voted: true,
										}
									}
								} else {
									if (method === 'downVote') {
										return {
											...reply,
											score: reply.score - 1,
											voted: false,
										}
									}
								}
							}
							return reply
						}),
					}
				}

				return comment
			})
		}
	}
	return state
}
