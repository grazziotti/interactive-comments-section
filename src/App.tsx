import React, { useContext } from 'react'

import { Container } from './AppStyles'

import { Context } from './context/Context'

import { GlobalStyles } from './styles/global'
import AddComment from './components/AddComment'
import Comments from './components/Comments'

const App: React.FC = () => {
	const { state } = useContext(Context)

	return (
		<Container>
			<GlobalStyles />
			<div className='app-container'>
				<Comments />
				<AddComment currentUser={state.currentUser} type={'send'} />
			</div>
		</Container>
	)
}

export default App
