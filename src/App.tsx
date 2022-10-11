import React, { useEffect, useState } from 'react'

import { Container } from './AppStyles'
import AddComment from './components/AddComment'
import Comment from './components/Comment'
import { GlobalStyles } from './styles/global'
import { commentType } from './types/commentType'
import { userType } from './types/userType'

const App: React.FC = () => {
	const [currentUser, setCurrentUser] = useState<userType>()
	const [comments, setComments] = useState<commentType[]>()

	useEffect(() => {
		fetch('../data/data.json')
			.then(res => res.json())
			.then(data => {
				setCurrentUser(data.currentUser)

				const localStorageComments = localStorage.getItem('comments')

				if (localStorageComments) {
					setComments(JSON.parse(localStorageComments))
				} else {
					localStorage.setItem(
						'comments',
						JSON.stringify(data.comments),
					)
					setComments(data.comments)
				}
			})
	}, [])

	return (
		<Container>
			<GlobalStyles />
			<div className='app-container'>
				{comments && currentUser && (
					<>
						<div className='comment-area'>
							{comments.map(commentData => (
								<Comment
									key={commentData.id}
									commentData={commentData}
									currentUser={currentUser}
								/>
							))}
						</div>
						<AddComment currentUser={currentUser} />
					</>
				)}
			</div>
		</Container>
	)
}

export default App
