import { generalRequest} from '../utilities';
import { getUser ,updateUser, deleteUser} from '../logic';

const resolvers ={
    Query: {
        users: (_,{})=>
            generalRequest(`${URL}/like-id/${id}`, 'GET'),
    },
    Mutation: {

    }

};

export default resolvers;