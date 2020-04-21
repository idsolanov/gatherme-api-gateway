import { generalRequest } from '../utilities';
import { sugg_getUsers, sugg_getLikes, sugg_filterByLike,sugg_getCategories,sugg_filterByCategory,
    sugg_getSuggestions,sugg_createSuggest} from '../logic';
const URL = `http://172.22.0.1:80`;

const sugg_userResolvers = {
    Query: {
        users: (_, { }) => {
            let response = sugg_getUsers(`${URL}/User`)
            return response
        },
    },
    Mutation: {
        newUser: (_, { user }) =>
            generalRequest(`${URL}/User/NewUser`, 'POST', user),
        newReport: (_, { userInfo }) =>
            generalRequest(`${URL}/User/NewReport`, 'POST', userInfo),
        newGather: (_, { userInfo }) =>
            generalRequest(`${URL}/User/NewGather`, 'POST', userInfo),
        newLike: (_, { userInfo }) =>
            generalRequest(`${URL}/User/NewLike`, 'POST', userInfo),
    }

};
const sugg_likeResolvers = {
    Query: {
        likes: (_, { }) => {
            let response = sugg_getLikes(`${URL}/Like`, 'GET')
            return response
        },
        filterByLike: (_, { name }) => {
            let response = sugg_filterByLike(`${URL}/Like/FilterByLike?name=${name}`)
            return response
        }
    },
    Mutation: {
        newLike: (_, { like }) =>
            generalRequest(`${URL}/User/NewLike`, 'POST', like),
        newHave: (_, { likeInfo }) =>
            generalRequest(`${URL}/User/NewLike/NewHave`, 'POST', likeInfo)
    }
};

const sugg_categoryResolvers = {
    Query: {
        categories: (_, { }) => {
            let response = sugg_getCategories(`${URL}/Category`)
            return response
        },
        filterByCategory: (_, { name }) => {
            let response = sugg_filterByCategory(`${URL}/Category/FilterByCategory?name=${name}`)
            return response
        }
    },
    Mutation: {
        newCategory: (_, { category }) =>
            generalRequest(`${URL}/Category`, 'POST', category),
    }
};

const sugg_suggestionResolvers = {
    Query: {
        suggestions: (_, { }) => {
            let response = sugg_getSuggestions(`${URL}/Suggestion`)
            return response
        }
    },
    Mutation: {
        createSuggest: (_, { user }) => {
            let response = sugg_createSuggest(`${URL}/Suggestion/CreateSuggest`, user)
            return response;
        },
        deactivate: (_, { suggestion }) =>
            generalRequest(`${URL}/Suggestion/Deactivate`, 'PUT', suggestion)
    }

};

export { sugg_userResolvers, sugg_likeResolvers, sugg_categoryResolvers, sugg_suggestionResolvers };