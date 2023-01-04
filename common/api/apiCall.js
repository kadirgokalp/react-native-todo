export default async function apiCall({
	config,
	baseUrl,
	requestBody,
	parameters,
	headers,
}) {
	const url = baseUrl + config.path

	const fetchOpt = {
		method: config.method,
		headers: headers,
	}

	if (requestBody) {
		fetchOpt.body = JSON.stringify(requestBody)
	}

	const response = await fetch(url, fetchOpt)
		.then((response) => response.json())

		.then((res) => {
			//console.log(res)

			return res
		})

		.catch((error) => {
			console.error(error)

			return null
		})

	if (response) {
		return response
	} else {
		return null
	}
}
