import {getChatbyId, getChatsbynickName,getMessagebyId,getMessagesbyChatId,
        createChat,deleteChat,createMessage,deleteMessage} from '../logic'

const comuResolvers = {
    Query:{
        getChatbyId:(_,{id})=>{
            let response = getChatbyId(id)
            return response
        },
        getChatsbynickName:(_,{nickName})=>{
            let response = getChatsbynickName(nickName)
            return response
        },
        getMessagebyId:(_,{id})=>{
            let response = getMessagebyId(id)
            return response

        },
        getMessagesbyChatId:(_,{chatId})=>{
            let response = getMessagesbyChatId(chatId)
            return response
        }

    },
    Mutation:{
        createChat:(_,{chat})=>{
            let response = createChat(chat)
            return response
        },
        deleteChat:(_,{id})=>{
            let response = deleteChat(id)
            return response
        },
        createMessage:(_,{message})=>{
            let response = createMessage(message)
            return response
        },
        deleteMessage:(_,{id})=>{
            let response = deleteMessage(id)
            return response
        }

    }
}

export default comuResolvers