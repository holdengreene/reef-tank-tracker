import { gql } from 'nuxt-graphql-request';

export const createTest = gql`
  mutation CreateTest($parameterId: Int!, $value: float8!) {
    insert_tests_one(object: { parameter_id: $parameterId, value: $value }) {
      id
    }
  }
`;
