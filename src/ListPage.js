import React from 'react'
import { gql, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

const articlesQuery = gql`
  query getArticles {
    articles {
      id
      title
      content
      published
      author {
        id
        name
        surname
      }
    }
  }
`

const ListPage = ({ data: { articles = [] } }) => (
  <div>
    <h1>Recent Articles</h1>
    {articles.map(article => (
      <div
        key={article.id}
        style={{
          backgroundColor: article.published ? 'green' : 'red',
          padding: '.2em 1em',
          marginBottom: '1em'
        }}>
        <h2>{article.title}</h2>
        <p>{article.content}</p>
        <p>Author: <strong>{article.author.name} {article.author.surname}</strong></p>
        <p><Link to={`/article/${article.id}`}>Article details</Link></p>
      </div>
    ))}
  </div>
)

export default graphql(articlesQuery)(ListPage)
