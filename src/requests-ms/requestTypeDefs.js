/*------TYPES------*/

export const requestTypeDef = `
type Request {
	id: Int!
	user_origin: String!
	user_destination: String!
	status: String!
	send_date: String!
}

type RequestResponse {
	result: String
	error: String
}

input RequestInput {
	user_origin: String!
	user_destination: String!
	token: String
}

input RequestGetInput {
	user: String!
}
`;


/*-----QUERIES-----*/

export const requestQueries = `
	sentRequests(user: RequestGetInput): [Request!]
	inboxRequests(user: RequestGetInput): [Request!]
`;


/*----MUTATIONS----*/

export const requestMutations = `
	createRequest(body: RequestInput): RequestResponse
	acceptRequest(body: RequestInput): RequestResponse
	rejectRequest(body: RequestInput): RequestResponse
	eraseRequest(body: RequestInput): RequestResponse
`;
