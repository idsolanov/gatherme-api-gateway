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


async function updateUser(url,body) {

	let res = await axios$1.put(url,body);
	return res.data;

}

async function deleteUser(url,{data: body}) {
	console.log(body);
	console.log(url);

	let res = await axios$1.delete(url,body);
	return res.data;

}

///---------Activity-------///

async function getActivityByID(url, {data: body}) {
	console.log(url);
	console.log(body);
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

const activityTypeDef = `
type Activity {
    id int!
    informacion String!
    nombre String!
    descripcion String!
    lista_miembros [String]
    tags_especificos [String]
    notas_adicionales [String]
    categoria String!
    boolean recurrente String!
    lugar String!
    hora String!
    fecha String!
    banner String!
    administrador String!
}
type Comment {
    id int!
    userId String! 
    content String!
    date String!
}
input ActivityInput {
    informacion String!
    nombre String!
    descripcion String!
    lista_miembros [String]
    tags_especificos [String]
    notas_adicionales [String]
    categoria String!
    boolean recurrente String!
    lugar String!
    hora String!
    fecha String!
    banner String!
    administrador String!
}

input ActivityInputUpdate {
    id = int!
    informacion String!
    nombre String!
    descripcion String!
    lista_miembros [String]
    tags_especificos [String]
    notas_adicionales [String]
    categoria String!
    boolean recurrente String!
    lugar String!
    hora String!
    fecha String!
    banner String!
    administrador String!
}

input AdministratorInputUpdate {
    id = int!
    newAdministrator = String!
    informacion String!
    nombre String!
    descripcion String!
    lista_miembros [String]
    tags_especificos [String]
    notas_adicionales [String]
    categoria String!
    boolean recurrente String!
    lugar String!
    hora String!
    fecha String!
    banner String!
    administrador String!
}
input ActivityInputDelete {
    id: int!
}

input CommentInput {
    id = int!
    userId String! 
    content String!
    date String!
}

`;

const activityQueries = `
    getActivityByID(id: int!): Activity!
    getAllActivities(): [Activity]

`;

const activityMutations = `
    createActivity(activity: ActivityInput): Activity
    updateActivity(activity:ActivityInputUpdate): Activity
    updateAdministrator(activity: AdministratorInputUpdate): Activity
    commentActivity(comment: CommentInput):  Comment
    deleteActivity(id: ActivityInputDelete): Activity

`;

const URL$2 = `http://172.17.0.1:4000/gatherme-activities-ms/activities/activity`;

const activityResolvers = {
    Quey: {
        activityByID: (_, {id}) => {
            let response = getActivityByID(`${URL$2}/${id}`);
            return response;
        }
    }
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		likeTypeDef,
		userTypeDef,
		activityTypeDef
	],
	[
		likeQueries,
		userQueries,
		activityQueries
	],
	[
		likeMutations,
		userMutations,
		activityMutations
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers,
		userResolvers,
		activityResolvers
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
