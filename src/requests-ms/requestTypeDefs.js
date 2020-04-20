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

input RequestInput{
	user_origin: String!
	user_destination: String!
}

input RequestSentInput{
	user_origin: String!
}

input RequestInboxInput{
	user_destination: String!
}
`;


/*-----QUERIES-----*/

export const requestQueries = `
	sent(user: RequestSentInput): [Request!]
	inbox(user: RequestInboxInput): [Request!]
`;


/*----MUTATIONS----*/

export const requestMutations = `
	create(users: RequestInput): RequestResponse
	accept(users: RequestInput): RequestResponse
	reject(users: RequestInput): RequestResponse
	erase(users: RequestInput): RequestResponse
`;

