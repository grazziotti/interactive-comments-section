import React, { useContext, useEffect } from 'react'

import { Container } from './styles'
import { Context } from '../context/Context'
import Comment from '../components/Comment'

const Comments: React.FC = () => {
	const { state } = useContext(Context)

	useEffect(() => {
		if (state.comments.length > 0) {
			localStorage.setItem('comments', JSON.stringify(state.comments))
		}
	}, [state.comments])

	return (
		<Container>
			{state.comments.map(commentData => (
				<li key={commentData.id}>
					<Comment
						commentData={commentData}
						currentUser={state.currentUser}
						commentToReplyId={commentData.id}
					/>
					<ul className='comment-replies'>
						{commentData.replies?.map(replyData => (
							<li key={replyData.id}>
								<Comment
									commentData={replyData}
									currentUser={state.currentUser}
									replying
									commentToReplyId={commentData.id}
								/>
							</li>
						))}
					</ul>
				</li>
			))}
		</Container>
	)
}

export default Comments
