import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash.merge';
import { mergeSchemas } from './utilities';

import {
	likeMutations,
	likeQueries,
	likeTypeDef
} from './users-ms/likeTypeDefs';

import {
	userMutations,
	userQueries,
	userTypeDef
} from './users-ms/userTypeDefs';

import {
	authTypeDefs,
	authMutations
}from './authentication-ms/authTypeDefs'

import {
	comuTypeDefs,
	comuQueries,
	comuMutations
}from './comunication-ms/comuTypeDefs'

import likeResolvers from './users-ms/resolvers';
import userResolvers from './users-ms/userResolvers';
import authResolvers from './authentication-ms/authResolvers';
import comuResolvers from './comunication-ms/comuResolvers'

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		likeTypeDef,
		userTypeDef,
		authTypeDefs,
		comuTypeDefs
	],
	[
		likeQueries,
		userQueries,
		comuQueries
	],
	[
		likeMutations,
		userMutations,
		authMutations,
		comuMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		likeResolvers,
		userResolvers,
		authResolvers,
		comuResolvers
	)
});
