import React from 'react'

import { Container } from './AppStyles'
import Comment from './components/Comment'
import { GlobalStyles } from './styles/global'

const App: React.FC = () => {
	return (
		<Container>
			<GlobalStyles />
			<main>
				<Comment />
			</main>
		</Container>
	)
}

export default App
