import gql from 'graphql-tag';

export default gql`
  subscription ApplicantsSub {
    applicantsChanged {
      id
      suggestions
      projects
      firstname
      lastname
      isAlumni
    }
  }
`;
