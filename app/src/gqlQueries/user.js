import gql from 'graphql-tag'
const authFragmentData = `{
        id
        firebase_id
        details{
            id
            first_name
            last_name
            email
            phone_number
            date_of_birth
            gender
            profile_pic
            nationality
            state
            home_address
            social_handle
            kin_name 
            kin_phone 
            kin_relation
        }
        social_media{
            media_type
            link
        }
        applications{
            id
        }
        updated_at
    }`

export const userByFirebaseID = gql`query auth($where: AuthWhereUniqueInput!){
    auth(where: $where)${authFragmentData}
}`

export const updateUserDetailsByAuthID = gql`
    mutation updateUserDetails($id: ID $details: PersonalDetailUpdateWithoutAuth_idDataInput) {
        updateAuth(where: {
            id: $id
        }, data: {
            details: {update: $details}
        })${authFragmentData}
    }
`