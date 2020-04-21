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
/*Suggestion*/
import {
	sugg_userTypeDef,
	sugg_likeTypeDef,
	sugg_categoryTypeDef,
	sugg_suggestionTypeDef,
	sugg_userQueries,
	sugg_likeQueries,
	sugg_categoryQueries,
	sugg_suggestionQueries,
	sugg_userMutations,
	sugg_likeMutations,
	sugg_categoryMutations,
	sugg_suggestionMutations
} from './suggestion-ms/typeDefs'

import {
	sugg_userResolvers,
	sugg_likeResolvers,
	sugg_categoryResolvers,
	sugg_suggestionResolvers
} from './suggestion-ms/resolvers'



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
		activityTypeDef,
		sugg_userTypeDef,
		sugg_likeTypeDef,
		sugg_categoryTypeDef,
		sugg_suggestionTypeDef
	],
	[
		likeQueries,
		userQueries,
		activityQueries,
		sugg_userQueries,
		sugg_likeQueries,
		sugg_categoryQueries,
		sugg_suggestionQueries
	],
	[
		likeMutations,
		userMutations,
		activityMutations,
		sugg_userMutations,
		sugg_likeMutations,
		sugg_categoryMutations,
		sugg_suggestionMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		likeResolvers,
		userResolvers,
		activityResolvers,
		sugg_userResolvers,
		sugg_likeResolvers,
		sugg_categoryResolvers,
		sugg_suggestionResolvers
	)
});
