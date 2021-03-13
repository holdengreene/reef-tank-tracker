import { gql } from 'nuxt-graphql-request';

export const createTest = gql`
  mutation CreateTest(
    $parameterId: Int!
    $value: float8!
    $dateTested: timestamptz
  ) {
    insert_tests_one(
      object: {
        parameter_id: $parameterId
        value: $value
        date_tested: $dateTested
      }
    ) {
      id
    }
  }
`;
