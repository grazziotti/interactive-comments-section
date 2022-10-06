import { userType } from './userType'

export type commentType = {
	id: number
	content: string
	createdAt: string
	score: number
	user: userType
	replyingTo?: string
	replies: commentType[]
}
