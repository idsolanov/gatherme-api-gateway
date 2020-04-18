import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaLogger from 'koa-logger';
import koaBody from 'koa-bodyparser';
import koaCors from '@koa/cors';

import { graphiqlKoa, graphqlKoa } from 'apollo-server-koa';
import graphQLSchema from './graphQLSchema';

import { formatErr } from './utilities';

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 9001;

app.use(koaLogger());
app.use(koaCors());


// GraphQL
const graphql = graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	formatError: formatErr
}));

router.post('/graphql', koaBody(), graphql);
router.get('/graphql', graphql);
// test route
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
