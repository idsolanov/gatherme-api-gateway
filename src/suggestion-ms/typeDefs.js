
/*==============================*/
/*           Types              */
/*==============================*/
export const sugg_userTypeDef = `
input sugg_UserInput{
    id: String!
    name: String
}
type sugg_User {
    id: String!
    name: String
}
type sugg_UserInfo {
    user: sugg_User!
    likes: [sugg_Like]
    gathers: [sugg_User]
    userReports: [sugg_User]
    suggestion: [sugg_Suggestion]
}
type sugg_responseUser{
    ans: String
    error: String
}
input sugg_UserSingle{
    id: String!
}
input sugg_UserReport{
    user: sugg_UserInput!
    userReports: [sugg_UserInput!]!
}
input sugg_UserGathers{
    user: sugg_UserInput!
    gathers: [sugg_UserInput!]!
}
input sugg_UserLike{
    user: sugg_UserInput!
    likes: [sugg_LikeInput!]!
}
`
;

export const sugg_likeTypeDef = `
type sugg_Like {
    name: String!
}
type sugg_LikeInfo {
    like: sugg_Like!
    category: sugg_Category!
}
type sugg_responseLike{
    ans: String
    error: String
}
input sugg_LikeInput{
    name: String!
}
input sugg_LikeRelationship{
    like: sugg_LikeInput!
    category: sugg_CategoryInput!
}
`
;
export const sugg_categoryTypeDef = `
type sugg_Category {
    name: String!
}
type sugg_responseCategory{
    ans: String
    error: String
}
input sugg_CategoryInput{
    name: String!
}
`
;

export const sugg_suggestionTypeDef = `
type sugg_Suggestion {
    id: String!
    isActive: Boolean
}
type sugg_SuggestionInfo {
    suggestion: sugg_Suggestion!
    suggestedUser: sugg_User!
}
type sugg_responseSuggestion{
    ans: String
    error: String
}
input sugg_SuggestionInput{
    id: String!
}
`
;


/*==============================*/
/*           Queries            */
/*==============================*/
export const sugg_userQueries = `
    users: [sugg_User!]
`;
export const sugg_likeQueries = `
    likes: [sugg_Like!]
    filterByLike(name: String!): [sugg_User!]
    existLike(name: String!): Boolean!
`;
export const sugg_categoryQueries = `
    categories: [sugg_Category!]
    filterByCategory(name: String!): [sugg_User!]
`;
export const sugg_suggestionQueries = `
    suggestions: [sugg_Suggestion!]
`;

/*==============================*/
/*           Mutations          */
/*==============================*/
export const sugg_userMutations = `
    newUser(user: sugg_UserInput): sugg_responseUser
    newReport(userInfo: sugg_UserReport): sugg_responseUser
    newGather(userInfo: sugg_UserGathers): sugg_responseUser
    newLike(userInfo: sugg_UserLike): sugg_responseUser
`
;

export const sugg_likeMutations = `
    sugg_createLike(like: sugg_LikeInput): sugg_responseLike
    newIs(likeInfo: sugg_LikeRelationship): sugg_responseLike
`
;

export const sugg_categoryMutations = `
    newCategory(category: sugg_CategoryInput): sugg_responseCategory
`
;

export const sugg_suggestionMutations = `
    createSuggest(user: sugg_UserSingle): [sugg_SuggestionInfo]
    deactivate(suggestion: sugg_SuggestionInput): sugg_responseSuggestion
`
;