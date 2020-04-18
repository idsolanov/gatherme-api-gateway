export const userTypeDef = `
type User {
    id: String!
    username: String!
    name : String!
    email: String!
    picture: String!
    description: String!
    gender: String!
    age: Int!
    city: String!
    likes: [String!]
    communities: [String!]
    activities:[String!]
    gathers: [String!]
}
type responseDelete{
    result: String
    error: String

}
input UserInput {
    username: String!
    name : String!
    email: String!
    picture: String!
    description: String!
    gender: String!
    age: Int!
    city: String!
    likes: [String!]
    communities: [String!]
    activities:[String!]
    gathers: [String!]
}

input UserInputUpdate {
    id: String!
    username: String!
    name : String!
    email: String!
    picture: String!
    description: String!
    gender: String!
    age: Int!
    city: String!
    likes: [String!]
    communities: [String!]
    activities:[String!]
    gathers: [String!]
}

input UserInputDelete {
    id: String!
}


`
;

export const userQueries = `
    userById(id: String!): User!
`;

export const userMutations = `
    createUser(user: UserInput!): User!
    updateUser(user: UserInputUpdate!): responseDelete!
    deleteUser(id: UserInputDelete!): responseDelete!
`;
