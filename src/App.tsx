import React, { useEffect, useState } from 'react'

import { Container } from './AppStyles'
import AddComment from './components/AddComment'
import Comment from './components/Comment'
import { GlobalStyles } from './styles/global'
import { dataType } from './types/dataType'

const App: React.FC = () => {
	const [data, setData] = useState<dataType>()

	useEffect(() => {
		fetch('../data/data.json')
			.then(res => res.json())
			.then(data => setData(data))
	}, [])

	return (
		<Container>
			<GlobalStyles />
			<div className='app-container'>
				{data && (
					<>
						<div className='comment-area'>
							{data.comments.map(commentData => (
								<Comment
									key={commentData.id}
									commentData={commentData}
									currentUser={data.currentUser}
								/>
							))}
						</div>
						<AddComment currentUser={data.currentUser} />
					</>
				)}
			</div>
		</Container>
	)
}

export default App
