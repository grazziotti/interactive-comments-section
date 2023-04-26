export const filterReply = (comment: string, mention: string) => {
	const regex = new RegExp(`@${mention}\\b`, 'i')

	if (regex.test(comment)) {
		const filteredComment = comment.substring(
			comment.indexOf(`@${mention},`) + `@${mention},`.length,
		)

		return filteredComment
	}

	return comment
}
