import { getUserByID,getUserByUsername,updateUser, deleteUser, createUser,getUserByEmail} from '../logic';
import { getLikeByID,updateLike,test, deleteLike, createLike, getLikesByCategory,register, addLikeToUser} from '../logic';



const userResolvers = {
	Query: {
		userById: (_, { id }) =>{
            let response = getUserByID(`${id}`)
            return response;   
        },
        userByUsername: (_, { username }) =>{
            let response = getUserByUsername(`${username}`)
            return response;   
        },
        userByEmail: (_, { email }) =>{
            let response = getUserByEmail(`${email}`)
            return response;   
        },
        likeById: (_, { id }) =>{
            let response = getLikeByID(`${id}`)
            return response;   
        },
        likesByCategory: (_, { category }) =>{
            let response = getLikesByCategory(`${category}`)
            return response;   
        }  
	},
	Mutation: {
        test:(_,{user})=>{
            let response= test(user)
            return response;
        },
        register:(_,{user})=>{
            let response= register(user)
            return response;
        },
		createUser: (_, { user }) =>{
            let response = createUser(user)
            return response;
        },
			
		updateUser: (_, { user }) =>{
           let response = updateUser(user)
           return response;
        },
			
		deleteUser: (_, { id }) =>{
            let response = deleteUser(id)
            return response
        },
        createLike: (_, { like ,username,token}) =>{
            let response = createLike(like,username,token)
            return response;
        },
        addLikeToUser: (_, { like,username,token}) =>{
            let response = addLikeToUser(like,username,token)
            return response;
        },
			
		updateLike: (_, { like }) =>{
           let response = updateLike(like)
           return response;
        },
			
		deleteLike: (_, { id }) =>{
            let response = deleteLike(id)
            return response
        }
			
	}
};

export default userResolvers;
