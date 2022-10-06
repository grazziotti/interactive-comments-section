import { commentType } from './commentType'
import { userType } from './userType'

export type dataType = {
	currentUser: userType
	comments: commentType[]
}
