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
	requestQueries,
	requestMutations,
	requestTypeDef
} from './requests-ms/requestTypeDefs';

import likeResolvers from './users-ms/resolvers';
import userResolvers from './users-ms/userResolvers';
import requestResolvers from './requests-ms/requestResolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		likeTypeDef,
		userTypeDef,
		requestTypeDef
	],
	[
		likeQueries,
		userQueries,
		requestQueries
	],
	[
		likeMutations,
		userMutations,
		requestMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		likeResolvers,
		userResolvers,
		requestResolvers
	)
});
