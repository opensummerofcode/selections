import gql from 'graphql-tag';

export default gql`
  subscription ApplicantsSub {
    applicantsChanged {
      id
      suggestions {
        id
      }
      projects {
        id
      }
      firstname
      lastname
      isAlumni
    }
  }
`;
