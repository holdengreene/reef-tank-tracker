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

export const updateParameter = gql`
  mutation UpdateParameter(
    $color: String!
    $max_range: float8!
    $min_range: float8!
    $parameter_name: String!
    $target: float8!
    $id: Int!
  ) {
    update_parameters(
      _set: {
        color: $color
        max_range: $max_range
        min_range: $min_range
        parameter_name: $parameter_name
        target: $target
      }
      where: { id: { _eq: $id } }
    ) {
      returning {
        id
      }
    }
  }
`;

export const createParameter = gql`
  mutation CreateParameter(
    $color: String!
    $max_range: float8!
    $min_range: float8!
    $parameter_name: String!
    $target: float8!
  ) {
    insert_parameters_one(
      object: {
        color: $color
        max_range: $max_range
        min_range: $min_range
        parameter_name: $parameter_name
        target: $target
        tank_id: 1
      }
    ) {
      id
      parameter_name
    }
  }
`;
