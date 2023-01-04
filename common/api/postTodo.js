// Config

import { API } from "./Config"

// Redux

import store from "../../redux/store"

import {
	postTodoApiRequest,
	postTodoApiSuccess,
	postTodoApiFailure,
} from "../../redux/slices/getTodoSlice"
// Helper

import apiCall from "./apiCall"

import { TODO_CATEGORY } from "../Enums"

export default async function postTodo({ apiValue }) {
	const headers = {
		"Content-Type": "application/json",
		Accept: "application/json",
	}

	store.dispatch(postTodoApiRequest())

	const response = await apiCall({
		baseUrl: API.MY_URL,
		requestBody: {
			content: apiValue,
			category: TODO_CATEGORY.TODO,
		},
		config: API.TODO.POST,
		headers: headers,
	})

	if (response) {
		store.dispatch(postTodoApiSuccess(response))
	} else {
		store.dispatch(postTodoApiFailure(""))
	}
}
