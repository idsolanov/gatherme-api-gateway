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
    id: Int!
    category: String!
    name: String!
}

input LikeInput {
    category: String!
    name: String!
}`;

const likeQueries = `
    likeById(id: Int!): Like!
`;

const likeMutations = `
    createLike(like: LikeInput!): Like!
    updateLike(user: User!): User!
    deleteLike(id: Int!): Int
`;

const url = process.env.AUTH_URL;
const port = process.env.AUTH_PORT;
const entryPoint = process.env.AUTH_USERS_ENTRY;

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		likeById: (_, { id }) =>
			generalRequest(`${URL}/like-id/${id}`, 'GET'),
	},
	Mutation: {
		createLike: (_, { like }) =>
			generalRequest(`${URL}/create-like/`, 'POST', like),
		updateLike: (_, { user }) =>
			generalRequest(`${URL}/update-like/`, 'PUT', like),
		deleteLike: (_, { id }) =>
			generalRequest(`${URL}/delete-like/`, 'DELETE',like)
	}
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		likeTypeDef
	],
	[
		likeQueries
	],
	[
		likeMutations
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers
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
