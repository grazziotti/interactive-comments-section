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
			break
		case ContextActions.addComment:
			return [...state, action.payload]
			break
		case ContextActions.updateComment:
			return [...state, action.payload]
			break
		case ContextActions.deleteComment:
			return [...state, action.payload]
			break
		case ContextActions.addReply:
			return [...state, action.payload]
			break
			break
		case ContextActions.updateReply:
			return [...state, action.payload]
			break
		case ContextActions.deleteReply:
			return [...state, action.payload]
			break
		case ContextActions.updateScore:
			return [...state, action.payload]
			break
	}
	return state
}
