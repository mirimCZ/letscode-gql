import React from 'react'
import { gql, graphql } from 'react-apollo'

const query = gql`
  query getArticle($id: ID!) {
    article(id: $id) {
      id
      title
      content

      ratings {
        value
      }
    }
  }
`

const DetailPage = ({ title, content, ratings = [] }) => (
  <div>
    <h1>{title}</h1>
    <p>{content}</p>

    {ratings.length !== 0 &&
      <div>
        <h3>Ratings:</h3>
        <ul>
          {ratings.map(rating => (
            <li>{rating.value}</li>
          ))}
          <li>
            avg:&nbsp;
            {(ratings.reduce((sum, rating) => (sum + rating.value), 0) / ratings.length).toFixed(2)}
          </li>
        </ul>
      </div>
    }
  </div>
)

export default graphql(query, {
  options: ({ match: { params } }) => ({
    variables: {
      id: params.id,
    },
  }),
  props: ({ data: { article } }) => ({
    ...article,
  }),
})
(DetailPage)
