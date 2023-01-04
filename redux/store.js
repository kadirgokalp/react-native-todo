import { configureStore } from "@reduxjs/toolkit"
import getTodoSlice from "./slices/getTodoSlice"

const store = configureStore({
	reducer: {
		getTodo: getTodoSlice,
	},
})

export default store
