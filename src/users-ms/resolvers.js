import { generalRequest } from '../utilities';
import { url, port, } from './server';

const URL = `http://172.17.0.1:3000/gatherme-users-ms`;


const resolvers = {
	Query: {
		likeById: (_, { id }) =>
		
			generalRequest(`${URL}/like-id/${id}`, 'GET'),
	},
	Mutation: {
		createLike: (_, { like }) =>
			generalRequest(`${URL}/create-like`, 'POST', like),
		updateLike: (_, { user }) =>
			generalRequest(`${URL}/update-like`, 'PUT', like),
		deleteLike: (_, { id }) =>
			generalRequest(`${URL}/delete-like`, 'DELETE',like)
	}
};

export default resolvers;

