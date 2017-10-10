import { graphql } from 'graphql';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import fs from 'fs';

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
      /*
      ** Can be done synchronously with readFileSync or even using articles.js instead of json
      ** Only an example for async resolver
      */
      return new Promise((resolve, reject) => {
        fs.readFile('./graphql/data/articles.json', (err, data) => {
          if (err) {
            reject(err)
          }

          resolve(JSON.parse(data))
        })
      })
    }
  },
  Article: {
    author: (article, params, context) => {
      const authorsJson = fs.readFileSync('./graphql/data/authors.json')
      const authors = JSON.parse(authorsJson)

      return authors.find(author => author.id === article.author)
    },
    ratings: (article, params, context) => {
      const ratingsJson = fs.readFileSync('./graphql/data/ratings.json');
      const ratings = JSON.parse(ratingsJson)

      return ratings.filter(rating => rating.article === article.id)
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema
