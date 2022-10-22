export type addCommentType = (
	content: string,
	userToReplyId?: number,
	replyingTo?: string,
) => void
