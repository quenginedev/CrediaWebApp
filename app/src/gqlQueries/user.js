import gql from 'graphql-tag'

export const userByFirebaseID = gql`query auth($where: AuthWhereUniqueInput!){
    auth(where: $where){
        id
        firebase_id
        email
        details{
            first_name
            last_name
            phone_number
            date_of_birth
            gender
            profile_pic
            nationality
            state
            home_address
        }
        social_media{
            media_type
            link
        }
        applications{
            id
        }
        updated_at
    }
}`