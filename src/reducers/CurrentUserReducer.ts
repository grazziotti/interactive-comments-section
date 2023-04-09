import { ContextActions } from '../enums/ContextActions'
import { reducerActionType } from '../types/reducerActionType'
import { userType } from '../types/userType'

export const CurrentUserReducer = (
	state: userType,
	action: reducerActionType,
) => {
	switch (action.type) {
		case ContextActions.setCurrentUser:
			return action.payload
	}
	return state
}
