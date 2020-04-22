import {
    sugg_getUsers, sugg_newUser, sugg_newReport, sugg_newGather, sugg_newLike,
    sugg_getLikes, sugg_filterByLike, sugg_existLike, sugg_createLike, sugg_newIs,
    sugg_getCategories, sugg_filterByCategory, sugg_newCategory,
    sugg_getSuggestions, sugg_createSuggest, sugg_deactivate
} from '../logic';
const URL = `http://172.22.0.1:80`;

const sugg_userResolvers = {
    Query: {
        users: (_, { }) => {
            let response = sugg_getUsers()
            return response
        },
    },
    Mutation: {
        newUser: (_, { user }) => {
            console.log("user",user)
            let response = sugg_newUser(user);
            return response;
        },
        newReport: (_, { userInfo }) => {
            console.log(userInfo);
            let response = sugg_newReport(userInfo);
            return response;
        },
        newGather: (_, { userInfo }) => {
            console.log(userInfo);
            let response = sugg_newGather(userInfo);
            return response;
        },
        newLike: (_, { userInfo }) => {
            console.log(userInfo);
            let response = sugg_newLike(userInfo);
            return response;
        }
    }

};
const sugg_likeResolvers = {
    Query: {
        likes: (_, { }) => {
            let response = sugg_getLikes();
            return response;
        },
        filterByLike: (_, { name }) => {
            let response = sugg_filterByLike(name);
            return response;
        },
        existLike: (_, { name }) => {
            let response = sugg_existLike(name);
            return response;
        }
    },
    Mutation: {
        sugg_createLike: (_, { like }) => {
            let response = sugg_createLike(like);
            return response;
        },
        newIs: (_, { likeInfo }) => {
            let response = sugg_newIs(likeInfo);
            return response;
        }
    }
};

const sugg_categoryResolvers = {
    Query: {
        categories: (_, { }) => {
            let response = sugg_getCategories();
            return response;
        },
        filterByCategory: (_, { name }) => {
            let response = sugg_filterByCategory(name);
            return response;
        }
    },
    Mutation: {
        newCategory: (_, { category }) => {
            let response = sugg_newCategory(category);
            return response;
        },
    }
};

const sugg_suggestionResolvers = {
    Query: {
        suggestions: (_, { }) => {
            let response = sugg_getSuggestions();
            return response;
        }
    },
    Mutation: {
        createSuggest: (_, { user }) => {
            console.log(user);
            let response = sugg_createSuggest(user);
            return response;
        },
        deactivate: (_, { suggestion }) => {
            let response = sugg_deactivate(suggestion);
            return response;
        }
    }

};

export { sugg_userResolvers, sugg_likeResolvers, sugg_categoryResolvers, sugg_suggestionResolvers };