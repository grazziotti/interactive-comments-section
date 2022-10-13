export type updateScoreType = (
	commentId: number,
	method: 'upVote' | 'downVote',
	newScore: number,
	replying: boolean,
) => void
