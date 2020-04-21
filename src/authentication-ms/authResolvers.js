import {singUp,singIn,singOut} from '../logic'



const authResolvers={
    Query:{


    },
    Mutation:{
        singUp:(_,{account})=>{
            let response= singUp(account)
            return response
        },
        singIn:(_,{account})=>{
            let response = singIn(account)
            return response
        },
        singOut:(_,{token})=>{
            let response = singOut(token)
            return response
        },
        authorization:(_,{token})=>{
            let response = authorization(token)
            return response
        }

    }

}

export default authResolvers