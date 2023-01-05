// Config

import { API } from "../Config"

// Redux

import store from "../../../redux/store"

import {
	todoApiRequest,
	todoApiSuccess,
	todoApiFailure,
} from "../../../redux/slices/getTodoSlice"

// Helper

import apiCall from "../apiCall"

export default async function getTodo() {
	const headers = {
		"Content-Type": "application/json",
		Accept: "application/json",
	}

	store.dispatch(todoApiRequest())

	const response = await apiCall({
		baseUrl: API.MY_URL,

		config: API.TODO.GET,
		headers: headers,
	})

	if (response) {
		store.dispatch(todoApiSuccess(response))
	} else {
		store.dispatch(todoApiFailure(""))
	}
}
