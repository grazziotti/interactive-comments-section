import React from 'react'

import { ReactComponent as IconReply } from '../../assets/images/icon-reply.svg'
import { ReactComponent as IconEdit } from '../../assets/images/icon-edit.svg'
import { ReactComponent as IconDelete } from '../../assets/images/icon-delete.svg'

type SimpleSpread<L, R> = R & Pick<L, Exclude<keyof L, keyof R>>

import { Container } from './styles'

interface PropsExtra {
	type: 'reply' | 'edit' | 'delete'
}

type Props = SimpleSpread<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	PropsExtra
>

const CommentBtn: React.FC<Props> = ({ type, ...props }: Props) => {
	return (
		<Container {...props}>
			{type === 'reply' && (
				<span className='reply'>
					<IconReply />
					Reply
				</span>
			)}
			{type === 'edit' && (
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
