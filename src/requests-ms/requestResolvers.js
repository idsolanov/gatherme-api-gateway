import { inboxRequests, sentRequests } from '../logic';
import { createRequest, acceptRequest, rejectRequest, eraseRequest } from '../logic';


const requestResolvers = {

	Query: {
		sentRequests: (_, { user }) => {
			let result = sentRequests(user);
			return result;
		},			
		inboxRequests: (_, { user }) => {
			let result = inboxRequests(user);
			return result;
		}
	},
	
	Mutation: {
		createRequest: (_, { body }) => {
			let result = createRequest(body);
			return result;
		},
		acceptRequest: (_, { body }) => {
			let result = acceptRequest(body);
			return result;
		},
		rejectRequest: (_, { body }) => {
			let result = rejectRequest(body);
			return result;
		},
		eraseRequest:(_, { body }) => {
			let result = eraseRequest(body);
			return result;
		}
	}

};

export default requestResolvers;
