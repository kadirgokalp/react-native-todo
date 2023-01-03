import { configureStore } from "@reduxjs/toolkit"
import checkBoxSlice from "./slices/checkBoxSlice"

const store = configureStore({
	reducer: {
		checkBox: checkBoxSlice,
	},
})

export default store
