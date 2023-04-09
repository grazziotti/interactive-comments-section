import React from 'react'
import { commentType } from '../../types/commentType'
import { userType } from '../../types/userType'
import CommentContainer from '../CommentContainer'

import { Container } from './styles'

interface Props extends React.HTMLProps<HTMLDivElement> {
	commentData: commentType
	currentUser: userType
}

const Comment: React.FC<Props> = ({ commentData, currentUser }: Props) => {
	return (
		<Container>
			<CommentContainer
				commentData={commentData}
				currentUser={currentUser}
				commentToReplyId={commentData.id}
			/>
			<ul className='comment-replies'>
				{commentData.replies?.map(replyData => (
					<li key={replyData.id}>
						<CommentContainer
							commentData={replyData}
							currentUser={currentUser}
							replying
							commentToReplyId={commentData.id}
						/>
					</li>
				))}
			</ul>
		</Container>
	)
}

export default Comment
