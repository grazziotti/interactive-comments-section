import { Container } from './AppStyled'
import { CommentArea } from './components/CommentArea'
import { GlobalStyles } from './styles/global'

const App = () => {
	return (
		<Container>
			<GlobalStyles />
			<CommentArea />
		</Container>
	)
}

export default App
