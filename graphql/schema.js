import { graphql } from 'graphql';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

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
    value: Int!
  }

  type Query {
    articles: [Article]
  }
`

const resolvers = {
  Query: {
    articles: (root, params, context) => {
      return context.readJsonAsync('articles');
    }
  },
  Article: {
    author: (article, params, context) => {
      const authors = context.readJson('authors');

      return authors.find(author => author.id === article.author);
    },
    ratings: (article, params, context) => {
      const ratings = context.readJson('ratings');

      return ratings.filter(rating => rating.article === article.id);
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema
