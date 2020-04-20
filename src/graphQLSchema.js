import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash.merge';
import { mergeSchemas } from './utilities';



import {
	userMutations,
	userQueries,
	userTypeDef
} from './users-ms/userTypeDefs';

import userResolvers from './users-ms/userResolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		userTypeDef
	],
	[
		userQueries
	],
	[
		userMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		userResolvers
	)
});
