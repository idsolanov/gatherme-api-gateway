import { generalRequest} from '../utilities';
import { getUser ,updateUser, deleteUser} from '../logic';


import { url, port, } from './server';

const URL = `http://172.17.0.1:3000/gatherme-users-ms`;


const userResolvers = {
	Query: {
		userById: (_, { id }) =>{
            let response = getUser(`${URL}/user-id/${id}`)
            return response;   
        }

      
	},
	Mutation: {
		createUser: (_, { user }) =>
			generalRequest(`${URL}/create-user`, 'POST', user),
		updateUser: (_, { user }) =>{
           let response = updateUser(`${URL}/update-user`,user)
           return response;
        },
			
		deleteUser: (_, { id }) =>{
            let response = deleteUser(`${URL}/delete-user`,id)
            return response
        }
			
	}
};

export default userResolvers;
