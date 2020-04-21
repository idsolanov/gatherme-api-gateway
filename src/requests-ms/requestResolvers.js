import { generalRequest } from '../utilities';

const url = `http://localhost:4444`;
const entrypoint = `gatherme-requests`;


const requestResolvers = {

	Query: {
		sent: (_, { user }) =>
			generalRequest(`${url}/${user}/${entrypoint}/sent`, 'GET'),
		inbox: (_, { user }) =>
			generalRequest(`${url}/${user}/${entrypoint}/inbox`, 'GET')
	},
	
	Mutation: {
		create: (_, { user, destination }) =>
			generalRequest(`${url}/${user}/${entrypoint}/create`, 'POST', destination),
		accept: (_, { user, destination }) =>
			generalRequest(`${url}/${user}/${entrypoint}/accept`, 'PUT', destination),
		reject: (_, { user, destination }) =>
			generalRequest(`${url}/${user}/${entrypoint}/reject`, 'PUT', destination),
		erase:(_, { user, destination }) =>
			generalRequest(`${url}/${user}/${entrypoint}/erase`, 'DELETE', destination)
	}

};

export default requestResolvers;
