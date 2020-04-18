export const likeTypeDef = `
type Like {
    id: String!
    category: String!
    name: String!
}

input LikeInput {
    category: String!
    name: String!
}`;

export const likeQueries = `
    likeById(id: String!): Like!
`;

export const likeMutations = `
    createLike(like: LikeInput!): Like!
    updateLike(like: LikeInput!): Like!
    deleteLike(id: String!): Int
`;
