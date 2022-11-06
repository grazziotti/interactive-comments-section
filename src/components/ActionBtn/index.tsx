import React from 'react'

import { Container } from './styles'

type SimpleSpread<L, R> = R & Pick<L, Exclude<keyof L, keyof R>>

interface PropsExtra {
	title: string
}

type Props = SimpleSpread<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	PropsExtra
>

const ActionBtn: React.FC<Props> = ({ title, ...props }: Props) => {
	return <Container {...props}>{title}</Container>
}

export default ActionBtn
