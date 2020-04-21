export const comuTyDefs=`

type chat {
    _id: String!
    nickName1: String!
    nickName2: String!
    creationDate: Date!
}

input chatInput{
    nickName1:String!
    nickName2:String!
}

type responseChat{
    _id: String
    nickName1: String
    nickName2: String
    creationDate: Date
    message:String
}
type responseChats{
    chats: [chat]
    message: String
}

type message{
    _id: String!
    owner: String!
    message: String!
    chatId: String!
    Date: Date!
}

input messageInput{
    owner: String!
    message: String!
    chatId: String!
}
type responseMessage{
    _id: String
    owner: String
    message: String
    chatId: String
    Date: Date
    message: String
}
type responseMessages{
    messages: [message]
    message : String
}
`
export const comuQueries=`
    getChatbyId(id:String!): responseChat!
    getChatsbynickName(nickName: String!): responseChats!

    getMessagebyId(id:String!): responseMessage!
    getMessagesbyChatId(chatId:String!): responseMessages!

`

export const comuMutations=`
    createChat(chat: chatInput!) : responseChat!
    deleteChat(id : String!): responseChat!

    createMessage(message: messageInput!): responseMessage!
    deleteMesage(id: String!): responseMessage!

`