'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var KoaRouter = _interopDefault(require('koa-router'));
var koaLogger = _interopDefault(require('koa-logger'));
var koaBody = _interopDefault(require('koa-bodyparser'));
var koaCors = _interopDefault(require('@koa/cors'));
var apolloServerKoa = require('apollo-server-koa');
var GraphQLJSON = _interopDefault(require('graphql-type-json'));
var graphqlTools = require('graphql-tools');
var merge = _interopDefault(require('lodash.merge'));
var request = _interopDefault(require('request-promise-native'));
var graphql = require('graphql');

const axios = require('axios');

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */




async function generalRequest(url, method, body, fullResponse) {
	
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		json: true,
		resolveWithFullResponse: fullResponse
	};
	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
		console.log(body);
		console.log(method);
		console.log(fullResponse);

	}

	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */


/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */


/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

function formatErr(error) {
	const data = graphql.formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}

const likeTypeDef = `
type Like {
    id: String!
    category: String!
    name: String!
}

input LikeInput {
    category: String!
    name: String!
}`;

const likeQueries = `
    likeById(id: String!): Like!
`;

const likeMutations = `
    createLike(like: LikeInput!): Like!
    updateLike(like: LikeInput!): Like!
    deleteLike(id: String!): Int
`;

const userTypeDef = `
type User {
    id: String!
    username: String!
    name : String!
    email: String!
    picture: String!
    description: String!
    gender: String!
    age: Int!
    city: String!
    likes: [String!]
    communities: [String!]
    activities:[String!]
    gathers: [String!]
}
type responseDelete{
    result: String
    error: String

}
input UserInput {
    username: String!
    name : String!
    email: String!
    picture: String!
    description: String!
    gender: String!
    age: Int!
    city: String!
    likes: [String!]
    communities: [String!]
    activities:[String!]
    gathers: [String!]
}

input UserInputUpdate {
    id: String!
    username: String!
    name : String!
    email: String!
    picture: String!
    description: String!
    gender: String!
    age: Int!
    city: String!
    likes: [String!]
    communities: [String!]
    activities:[String!]
    gathers: [String!]
}

input UserInputDelete {
    id: String!
}


`;

const userQueries = `
    userById(id: String!): User!
`;

const userMutations = `
    createUser(user: UserInput!): User!
    updateUser(user: UserInputUpdate!): responseDelete!
    deleteUser(id: UserInputDelete!): responseDelete!
`;

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

const axios$1 = require('axios');


async function getUser(url) {

	let res = await axios$1.get(url);
	return res.data;

}


async function updateUser(url, body) {

	let res = await axios$1.put(url, body);
	return res.data;

}

async function deleteUser(url, { data: body }) {
	console.log(body);
	console.log(url);

	let res = await axios$1.delete(url, body);
	return res.data;

}

/*================Suggestions=================*/
async function sugg_getUsers(url) {
	let res = await axios$1.get(url);
	return res.data;
}
async function sugg_getLikes(url) {
	let res = await axios$1.get(url);
	return res.data;
}
async function sugg_filterByLike(url) {
	let res = await axios$1.get(url);
	return res.data;
}
async function sugg_getCategories(url) {
	let res = axios$1.get(url);
	return res.data;
}
async function sugg_filterByCategory(url){
	let res = axios$1.get(url);
	return res.data;
}
async function sugg_getSuggestions(url){
	let res = axios$1.get(url);
	return res.data;
}
async function sugg_createSuggest(url,body){
	let res = axios$1.post(url,body);
	return res.data;
}

const URL$1 = `http://172.17.0.1:3000/gatherme-users-ms`;


const userResolvers = {
	Query: {
		userById: (_, { id }) =>{
            let response = getUser(`${URL$1}/user-id/${id}`);
            return response;   
        }

      
	},
	Mutation: {
		createUser: (_, { user }) =>
			generalRequest(`${URL$1}/create-user`, 'POST', user),
		updateUser: (_, { user }) =>{
           let response = updateUser(`${URL$1}/update-user`,user);
           return response;
        },
			
		deleteUser: (_, { id }) =>{
            let response = deleteUser(`${URL$1}/delete-user`,id);
            return response
        }
			
	}
};

/*==============================*/
/*           Types              */
/*==============================*/
const sugg_userTypeDef = `
type User {
    id: String!
    name: String
}
type UserInfo {
    user: User!
    likes: [Like]
    gathers: [User]
    userReports: [User]
    suggestion: [Suggestion]
}
type responseUser{
    ans: String
    error: String
}
input UserInput{
    id: String!
    name: String!
}
input UserSingle{
    id: String!
}
input UserReport{
    user: User!
    userReports: [User!]
}
input UserGathers{
    user: User!
    gathers: [User!]
}
input UserLike{
    user: User!
    likes: [Like!]
}
`;

const sugg_likeTypeDef = `
type Like {
    name: String!
}
type LikeInfo {
    like: Like!
    category: Category!
}
type responseLike{
    ans: String
    error: String
}
input LikeInput{
    name: String!
}
input LikeRelationship{
    like: Like!
    category: Category!
}
`;
const sugg_categoryTypeDef = `
type Category {
    name: String!
}
type responseCategory{
    ans: String
    error: String
}
input CategoryInput{
    name: String!
}
`;

const sugg_suggestionTypeDef = `
type Suggestion {
    id: String!
    isActive: Boolean
}
type SuggestionInfo {
    suggestion: Suggestion!
    suggestedUser: User!
}
type responseSuggestion{
    ans: String
    error: String
}
input SuggestionInput{
    id: String!
}
`;


/*==============================*/
/*           Queries            */
/*==============================*/
const sugg_userQueries = `
    users(): [User!]
`;
const sugg_likeQueries = `
    likes(): [Like!]
    filterByLike(name: String!): [User!]
`;
const sugg_categoryQueries = `
    categories(): [Category!]
    filterByCategory(name: String!): [User!]
`;
const sugg_suggestionQueries = `
    suggestions(): [Suggestion!]
`;

/*==============================*/
/*           Mutations          */
/*==============================*/
const sugg_userMutations = `
    newUser(user: UserInput): responseUser
    newReport(user: UserReport): responseUser
    newGather(user: UserGathers): responseUser
    newLike(user: UserLike): responseUser
`;

const sugg_likeMutations = `
    newLike(like: LikeInput): responseLike
    newHave(like: LikeRelationship): responseLike
`;

const sugg_categoryMutations = `
    newCategory(category: CategoryInput): responseCategory
`;

const sugg_suggestionMutations = `
    createSuggest(user: UserSingle): [SuggestionInfo!]
    deactivate(suggestion: SuggestionInput): responseSuggestion
`;

const URL$2 = `http://172.22.0.2:80/`;

const sugg_userResolvers = {
    Query: {
        users: (_, { }) => {
            let response = sugg_getUsers(`${URL$2}/User`);
            return response
        },
    },
    Mutation: {
        newUser: (_, { user }) =>
            generalRequest(`${URL$2}/User/NewUser`, 'POST', user),
        newReport: (_, { userInfo }) =>
            generalRequest(`${URL$2}/User/NewReport`, 'POST', userInfo),
        newGather: (_, { userInfo }) =>
            generalRequest(`${URL$2}/User/NewGather`, 'POST', userInfo),
        newLike: (_, { userInfo }) =>
            generalRequest(`${URL$2}/User/NewLike`, 'POST', userInfo),
    }

};
const sugg_likeResolvers = {
    Query: {
        likes: (_, { }) => {
            let response = sugg_getLikes(`${URL$2}/Like`, 'GET');
            return response
        },
        filterByLike: (_, { name }) => {
            let response = sugg_filterByLike(`${URL$2}/Like/FilterByLike?name=${name}`);
            return response
        }
    },
    Mutation: {
        newLike: (_, { like }) =>
            generalRequest(`${URL$2}/User/NewLike`, 'POST', like),
        newHave: (_, { likeInfo }) =>
            generalRequest(`${URL$2}/User/NewLike/NewHave`, 'POST', likeInfo)
    }
};

const sugg_categoryResolvers = {
    Query: {
        categories: (_, { }) => {
            let response = sugg_getCategories(`${URL$2}/Category`);
            return response
        },
        filterByCategory: (_, { name }) => {
            let response = sugg_filterByCategory(`${URL$2}/Category/FilterByCategory?name=${name}`);
            return response
        }
    },
    Mutation: {
        newCategory: (_, { category }) =>
            generalRequest(`${URL$2}/Category`, 'POST', category),
    }
};

const sugg_suggestionResolvers = {
    Query: {
        suggestions: (_, { }) => {
            let response = sugg_getSuggestions(`${URL$2}/Suggestion`);
            return response
        }
    },
    Mutation: {
        createSuggest: (_, { user }) => {
            let response = sugg_createSuggest(`${URL$2}/Suggestion/CreateSuggest`, user);
            return response;
        },
        deactivate: (_, { suggestion }) =>
            generalRequest(`${URL$2}/Suggestion/Deactivate`, 'PUT', suggestion)
    }

};

/*Suggestion*/
// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		likeTypeDef,
		userTypeDef,
		sugg_userTypeDef,
		sugg_likeTypeDef,
		sugg_categoryTypeDef,
		sugg_suggestionTypeDef
	],
	[
		likeQueries,
		userQueries,
		sugg_userQueries,
		sugg_likeQueries,
		sugg_categoryQueries,
		sugg_suggestionQueries
	],
	[
		likeMutations,
		userMutations,
		sugg_userMutations,
		sugg_likeMutations,
		sugg_categoryMutations,
		sugg_suggestionMutations
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers,
		userResolvers,
		sugg_userResolvers,
		sugg_likeResolvers,
		sugg_categoryResolvers,
		sugg_suggestionResolvers
	)
});

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 9001;

app.use(koaLogger());
app.use(koaCors());


// GraphQL
const graphql$1 = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	formatError: formatErr
}));

router.post('/graphql', koaBody(), graphql$1);
router.get('/graphql', graphql$1);
// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
