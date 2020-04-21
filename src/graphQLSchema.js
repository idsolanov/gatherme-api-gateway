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

import likeResolvers from './users-ms/resolvers';
import userResolvers from './users-ms/userResolvers';


import {activityTypeDef,
		activityMutations,
		activityQueries
	} from './activities-ms/activityTypeDef'

import activityResolvers from './activities-ms/activityResolvers'

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
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		likeResolvers,
		userResolvers,
		activityResolvers
	)
});
