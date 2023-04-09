import { commentType } from '../types/commentType'

export const getLastCommentId = (comments: commentType[]) => {
	if (comments) {
		const maxId = comments.reduce((max, comment) => {
			if (comment.id > max) {
				max = comment.id
			}
			comment.replies?.forEach(reply => {
				if (reply.id > max) {
					max = reply.id
				}
			})
			return max
		}, 0)

		return maxId
	}
}
