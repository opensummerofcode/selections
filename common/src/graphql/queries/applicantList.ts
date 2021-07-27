import gql from 'graphql-tag';

export default gql`
  query ApplicantList {
    applicants {
      id
      isAlumni
      firstname
      lastname
      suggestions {
        id
      }
    }
  }
`;
