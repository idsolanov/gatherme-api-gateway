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

type Like {
    id: String!
    category: String!
    name: String!
}


input LikeInput {
    category: String!
    name: String!
}

input LikeInputUpdate {
    id: String!
    category: String!
    name: String!
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

input inputDelete {
    id: String!
}


`
;

export const userQueries = `
    userById(id: String!): User!
    userByUsername(username: String!): User!
    likeById(id: String!): Like!
    likesByCategory(category: String!):[Like!]
`;

export const userMutations = `
    createUser(user: UserInput!): User!
    updateUser(user: UserInputUpdate!): responseDelete!
    deleteUser(id: inputDelete!): responseDelete!
    createLike(like: LikeInput!): Like!
    updateLike(like: LikeInputUpdate!): responseDelete!
    deleteLike(id: inputDelete!): responseDelete!
`;
