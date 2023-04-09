import React, { useContext, useEffect } from 'react'

import { Container } from './AppStyles'

import { Context } from './context/Context'

import { GlobalStyles } from './styles/global'
import AddComment from './components/AddComment'
import Comment from './components/Comment'

const App: React.FC = () => {
	const { state } = useContext(Context)

	useEffect(() => {
		if (state.comments.length > 0) {
			localStorage.setItem('comments', JSON.stringify(state.comments))
		}
	}, [state.comments])

	return (
		<Container>
			<GlobalStyles />
			<div className='app-container'>
				{state.comments && state.currentUser && (
					<>
						<ul className='comment-list'>
							{state.comments.map(commentData => (
								<Comment
									key={commentData.id}
									commentData={commentData}
									currentUser={state.currentUser}
								/>
							))}
						</ul>
						<AddComment
							currentUser={state.currentUser}
							type={'send'}
						/>
					</>
				)}
			</div>
		</Container>
	)
}

export default App
