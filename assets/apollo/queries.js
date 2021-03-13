import { gql } from 'nuxt-graphql-request';

// Grab the latest test values from the db
export const latestTests = gql`
  query LatestTests {
    parameters(order_by: { parameter_name: asc }) {
      id
      color
      max_range
      min_range
      target
      parameter_name
      tests(limit: 2, order_by: { date_tested: desc }) {
        value
        date_tested
      }
    }
  }
`;

export const allTests = gql`
  query AllTests($parameter: String!) {
    tests(
      where: { parameter: { parameter_name: { _eq: $parameter } } }
      order_by: { date_tested: desc }
    ) {
      id
      date_tested
      value
      parameter {
        color
        min_range
        max_range
        target
      }
    }
  }
`;

export const allParameters = gql`
  query AllParameters {
    parameters {
      id
      parameter_name
    }
  }
`;
