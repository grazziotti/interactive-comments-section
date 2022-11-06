import React from 'react'

import { Container } from './styles'

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const TextArea: React.FC<Props> = ({ ...props }: Props) => {
	return <Container {...props} />
}

export default TextArea
