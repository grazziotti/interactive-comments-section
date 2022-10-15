import React from 'react'

import { ReactComponent as IconReply } from '../../assets/images/icon-reply.svg'
import { ReactComponent as IconEdit } from '../../assets/images/icon-edit.svg'
import { ReactComponent as IconDelete } from '../../assets/images/icon-delete.svg'

import { Container } from './styles'

interface Props {
	type: 'reply' | 'update' | 'delete'
}

const CommentBtn: React.FC<Props> = ({ type }: Props) => {
	return (
		<Container>
			{type === 'reply' && (
				<span className='reply'>
					<IconReply />
					Reply
				</span>
			)}
			{type === 'update' && (
				<span className='edit'>
					<IconEdit />
					Edit
				</span>
			)}
			{type === 'delete' && (
				<span className='delete'>
					<IconDelete />
					Delete
				</span>
			)}
		</Container>
	)
}

export default CommentBtn
