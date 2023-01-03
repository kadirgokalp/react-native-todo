import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	checkTodo: true,
	checkInProgress: true,
	checkDone: true,
}

const checkBoxSlice = createSlice({
	name: "checkBox",
	initialState: initialState,
	reducers: {
		setCheckTodo: (state, action) => {
			state.checkTodo = action.payload
		},
		setCheckInProgress: (state, action) => {
			state.checkInProgress = action.payload
		},
		setCheckDone: (state, action) => {
			state.checkDone = action.payload
		},
	},
})

export const { setCheckTodo, setCheckInProgress, setCheckDone } =
	checkBoxSlice.actions
export default checkBoxSlice.reducer
