import gql from 'graphql-tag';

// Grab the latest test values from the db
export const latestTests = gql`
  {
    parameters(order_by: { parameter_name: asc }) {
      id
      color
      max_range
      min_range
      target
      parameter_name
      tests(limit: 2, order_by: { created_at: desc }) {
        value
        created_at
      }
    }
  }
`;

export const allTanks = gql`
  {
    tanks {
      id
    }
  }
`;
