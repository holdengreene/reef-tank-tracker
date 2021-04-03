import { gql } from 'nuxt-graphql-request';

// Grab the latest test values from the db
export const latestTests = gql`
  query LatestTests {
    parameters(order_by: { name: asc }) {
      id
      color
      max_range
      min_range
      target
      name
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
      where: { parameter: { name: { _eq: $parameter } } }
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

export const parameterId = gql`
  query ParameterId($name: String!) {
    parameters(where: { name: { _eq: $name } }) {
      id
    }
  }
`;

export const parameterNames = gql`
  query ParameterNames {
    parameters {
      id
      name
    }
  }
`;

export const allParameters = gql`
  query AllParameters {
    parameters {
      id
      name
      min_range
      max_range
      target
    }
  }
`;

export const parameter = gql`
  query parameter($name: String!) {
    parameters(where: { name: { _eq: $name } }) {
      id
      name
      min_range
      max_range
      target
      color
    }
  }
`;
