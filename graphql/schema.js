import { graphql } from 'graphql';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

const typeDefs = `
  type Article {
    id: ID!
    title: String!
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
    article(id: ID!): Article
  }

  type Mutation {
    addRating(articleId: ID!, rating: Int!): Article
  }
`

const resolvers = {
  Query: {
    articles: (root, params, context) => {
      return context.readJsonAsync('articles');
    },
    article: (root, params, context) => {
      const articles = context.readJson('articles')
      const article = articles.find(article => article.id === parseInt(params.id, 10))
      return article
    }
  },
  Mutation: {
    addRating: (root, { articleId, rating }, { readJson, writeJson }) => {
      // TODO: refactor to "updateEntity"
      const ratings = readJson('ratings');
      ratings.push({
        id: ratings.length + 1,
        article: parseInt(articleId, 10),
        value: rating,
      });
      writeJson('ratings', ratings)

      // TODO: refactor DRY - getArticleById
      const articles = readJson('articles');
      const article = articles.find(article => article.id === parseInt(articleId, 10));

      return article;
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
