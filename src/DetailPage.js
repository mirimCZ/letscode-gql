import React from 'react'
import { gql, graphql, compose } from 'react-apollo'

const getArticleQuery = gql`
  query getArticle($id: ID!) {
    article(id: $id) {
      id
      title
      content

      ratings {
        id
        value
      }
    }
  }
`

const addRatingMutation = gql`
  mutation addRating($articleId: ID!, $rating: Int!) {
    addRating(articleId: $articleId, rating: $rating) {
      id
      ratings {
        id
        value
      }
    }
  }
`

const DetailPage = ({ title, content, ratings = [], addRating }) => (
  <div>
    <h1>{title}</h1>
    <p>{content}</p>

    {ratings.length !== 0 &&
      <div>
        <h3>Ratings:</h3>
        <ul>
          {ratings.map(rating => (
            <li key={rating.id}>{rating.value}</li>
          ))}
          <li>
            avg:&nbsp;
            {(ratings.reduce((sum, rating) => (sum + rating.value), 0) / ratings.length).toFixed(2)}
          </li>
        </ul>
      </div>
    }
    <button onClick={() => addRating(1)}>1</button>
    <button onClick={() => addRating(2)}>2</button>
    <button onClick={() => addRating(3)}>3</button>
    <button onClick={() => addRating(4)}>4</button>
    <button onClick={() => addRating(5)}>5</button>
  </div>
)

export default compose(
  graphql(getArticleQuery, {
    options: ({ match: { params } }) => ({
      variables: {
        id: params.id,
      },
    }),
    props: ({ data: { article } }) => ({
      ...article,
    }),
  }),
  graphql(addRatingMutation, {
    props: ({ mutate, ownProps: { match: { params } } }) => ({
      addRating: (rating) => mutate({
        variables: {
          articleId: params.id,
          rating,
        },
      })
    })
  })
)
(DetailPage)
