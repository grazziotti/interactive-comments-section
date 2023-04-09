import React, { createContext, useEffect, useReducer } from 'react'
import { ContextActions } from '../enums/ContextActions'
import { CommentReducer, CommentType } from '../reducers/CommentReducer'
import { CurrentUserReducer } from '../reducers/CurrentUserReducer'
import { reducerActionType } from '../types/reducerActionType'
import { userType } from '../types/userType'

export type initialStateType = {
	currentUser: userType
	comments: CommentType[]
}

type ContextType = {
	state: initialStateType
	dispatch: React.Dispatch<any>
}

const initialState: initialStateType = {
	currentUser: {
		image: {
			png: '',
			webp: '',
		},
		username: '',
	},
	comments: [],
}

export const Context = createContext<ContextType>({
	state: initialState,
	dispatch: () => null,
})

const mainReducer = (state: initialStateType, action: reducerActionType) => ({
	currentUser: CurrentUserReducer(state.currentUser, action),
	comments: CommentReducer(state.comments, action),
})

export const ContextProvider = ({ children }: React.PropsWithChildren) => {
	const [state, dispatch] = useReducer(mainReducer, initialState)

	useEffect(() => {
		fetch('../data/data.json')
			.then(res => res.json())
			.then(data => {
				const localStorageComments = localStorage.getItem('comments')

				if (localStorageComments) {
					dispatch({
						type: ContextActions.setComments,
						payload: JSON.parse(localStorageComments),
					})
				} else {
					dispatch({
						type: ContextActions.setComments,
						payload: data.comments,
					})
					localStorage.setItem(
						'comments',
						JSON.stringify(data.comments),
					)
				}

				dispatch({
					type: ContextActions.setCurrentUser,
					payload: data.currentUser,
				})
			})
	}, [])

	return (
		<Context.Provider value={{ state, dispatch }}>
			{children}
		</Context.Provider>
	)
}
