import React from 'react'

import avatar from '../../assets/images/avatars/image-amyrobson.png'
import { ReactComponent as IconReply } from '../../assets/images/icon-reply.svg'

import CommentScore from '../CommentScore'

import { Container } from './styles'

const CommentContainer: React.FC = () => {
	return (
		<Container>
			<CommentScore />
			<div className='comment-block'>
				<div className='comment-header'>
					<img src={avatar} alt='user avatar' />
					<div className='username'>amyrobson</div>
					<span className='comment-posted-time'>1 month ago</span>
					<button>
						<IconReply />
						Reply
					</button>
				</div>
				<p className='comment-body'>
					Impressive! Though it seems the drag feature could be
					improved. But overall it looks incredible. You've nailed the
					design and the responsiveness at various breakpoints works
					really well.
				</p>
			</div>
		</Container>
	)
}

export default CommentContainer
