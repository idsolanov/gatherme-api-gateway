export const authTypeDefs = `
type account {
    _id: String!
    email: String!
    nickName: String!
    password: String!
}

type responseUPIN{
    email: String
    nickName: String
    token: String
    message: String
}
type token {
    _id : String!
    token: String!
}
type responseOut{
    message: String
    tokenstored: token
}
type responseAuth{
    authorization:String
    message: String
}
input tokenInput{
    token: String!
}
input singupInput{
    email: String!
    nickName: String!
    password: String!
}

input signinInput{
    email: String!
    password: String!
}


`
export const authQueries =`

`
export const authMutations =`
    singUp(account: singupInput!): responseUPIN!
    singIn(account: signinInput!): responseUPIN!
    singOut(token: tokenInput!): responseOut!
    authorization(token: tokenInput!): responseAuth!


`