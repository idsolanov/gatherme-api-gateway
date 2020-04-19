
/*==============================*/
/*           Types              */
/*==============================*/
export const userTypeDef = `
type User {
    id: String!
    name: String
}
type UserInfo {
    user: User!
    likes: [Like]
    gathers: [User]
    userReports: [User]
    suggestion: [Suggestion]
}
type responseUser{
    ans: String
    error: String
}
input UserInput{
    id: String!
    name: String!
}
input UserSingle{
    id: String!
}
input UserReport{
    user: User!
    userReports: [User!]
}
input UserGathers{
    user: User!
    gathers: [User!]
}
input UserLike{
    user: User!
    likes: [Like!]
}
`

    ;

export const likeTypeDef = `
type Like {
    name: String!
}
type LikeInfo {
    like: Like!
    category: Category!
}
type responseLike{
    ans: String
    error: String
}
input LikeInput{
    name: String!
}
input LikeRelationship{
    like: Like!
    category: Category!
}
`
    ;
export const categoryTypeDef = `
type Category {
    name: String!
}
type responseCategory{
    ans: String
    error: String
}
input CategoryInput{
    name: String!
}
`
    ;

export const suggestionTypeDef = `
type Suggestion {
    id: String!
    isActive: Boolean
}
type SuggestionInfo {
    suggestion: Suggestion!
    suggestedUser: User!
}
type responseSuggestion{
    ans: String
    error: String
}
input SuggestionInput{
    id: String!
}
`
    ;


/*==============================*/
/*           Queries            */
/*==============================*/
export const userQueries = `
    users(): [User!]
`;
export const likeQueries = `
    likes(): [Like!]
    filterByLike(like: LikeInput): [User!]
`;
export const categoryQueries = `
    categories(): [Category!]
    filterByCategory(category: CategoryInput): [User!]
`;
export const suggestionQueries = `
    suggestions(): [Suggestion!]
`;

/*==============================*/
/*           Mutations          */
/*==============================*/
export const userMutations = `
    newUser(user: UserInput): responseUser
    newReport(user: UserReport): responseUser
    newGather(user: UserGathers): responseUser
    newLike(user: UserLike): responseUser
`;

export const likeMutations = `
    newLike(like: LikeInput): responseLike
    newHave(like: LikeRelationship): responseLike
`;

export const categoryMutations = `
    newCategory(category: CategoryInput): responseCategory
`;

export const suggestionMutations = `
    createSuggest(user: UserSingle): [SuggestionInfo!]
    deactivate(suggestion: SuggestionInput): responseSuggestion
`;