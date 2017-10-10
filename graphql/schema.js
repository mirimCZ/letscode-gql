import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { graphql } from 'graphql';

const typeDefs = `
  type Article {
    id: ID!
    content: String!
    published: Boolean

    author: Author!
    ratings: [Rating]
  }

  type Author {
    id: ID!
    name: String!
    surname: String!
  }

  type Rating {
    id: ID!
    article: ID!
    value: Int!
  }

  type Query {
    articles: [Article]
  }
`

const schema = makeExecutableSchema({
  typeDefs
});

addMockFunctionsToSchema({ schema });

export default schema
