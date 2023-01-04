import { createSlice } from "@reduxjs/toolkit"
import { API_STATUS } from "../../common/Enums"

const initialState = {
	todosApiStatus: API_STATUS.NONE,
	todos: [],
}

const getTodoSlice = createSlice({
	name: "getTodo",
	initialState: initialState,
	reducers: {
		todoApiRequest: (state) => {
			state.todosApiStatus = API_STATUS.REQUEST
		},
		todoApiSuccess: (state, action) => {
			state.todosApiStatus = API_STATUS.SUCCESS
			state.todos = action.payload
		},
		todoApiFailure: (state) => {
			state.todosApiStatus = API_STATUS.FAILURE
		},
		postTodoApiRequest: (state) => {
			state.todosApiStatus = API_STATUS.REQUEST
		},
		postTodoApiSuccess: (state) => {
			state.todosApiStatus = API_STATUS.SUCCESS
		},
		postTodoApiFailure: (state) => {
			state.todosApiStatus = API_STATUS.FAILURE
		},
	},
})

export const {
	todoApiRequest,
	todoApiSuccess,
	todoApiFailure,
	postTodoApiRequest,
	postTodoApiSuccess,
	postTodoApiFailure,
} = getTodoSlice.actions
export default getTodoSlice.reducer
