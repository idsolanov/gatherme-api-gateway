import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash.merge';
import { mergeSchemas } from './utilities';



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
	requestQueries,
	requestMutations,
	requestTypeDef
} from './requests-ms/requestTypeDefs';

import {activityTypeDef,	
		activityMutations,
		activityQueries
	} from './activities-ms/activityTypeDef'

import userResolvers from './users-ms/userResolvers';
import authResolvers from './authentication-ms/authResolvers';
import comuResolvers from './comunication-ms/comuResolvers';
import requestResolvers from './requests-ms/requestResolvers';
import activityResolvers from './activities-ms/activityResolvers';
import {
	sugg_userResolvers,
	sugg_likeResolvers,
	sugg_categoryResolvers,
	sugg_suggestionResolvers
} from './suggestion-ms/resolvers'


// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		userTypeDef,
		requestTypeDef,
		authTypeDefs,
		comuTypeDefs,
		activityTypeDef,
		sugg_userTypeDef,
		sugg_likeTypeDef,
		sugg_categoryTypeDef,
		sugg_suggestionTypeDef
	],
	[
		userQueries,
		requestQueries,
		comuQueries,
		activityQueries,
		sugg_userQueries,
		sugg_likeQueries,
		sugg_categoryQueries,
		sugg_suggestionQueries
	],
	[
		userMutations,
		requestMutations,
		authMutations,
		comuMutations,
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
		userResolvers,
		requestResolvers,
		authResolvers,
		comuResolvers,
		activityResolvers,
		sugg_userResolvers,
		sugg_likeResolvers,
		sugg_categoryResolvers,
		sugg_suggestionResolvers
	)
});
