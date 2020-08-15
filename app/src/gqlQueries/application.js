import gql from 'graphql-tag'
const applicationFragment = `{
    id  
}`

export const createApplication = gql`
    mutation createApplication($data: ApplicationCreateInput!){
        createApplication(data: $data)${applicationFragment}
    }
`