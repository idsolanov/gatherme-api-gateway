const axios = require('axios');

const url= 'http://172.17.0.1:'
const auth_ms_PORT= '3001/'
const comu_ms_PORT= '3002/'

export async function getUser(url) {

	let res = await axios.get(url);
	return res.data;

}


export async function updateUser(url,body) {

	let res = await axios.put(url,body);
	return res.data;

}

export async function deleteUser(url,{data: body}) {
	console.log(body);
	console.log(url);

	let res = await axios.delete(url,body);
	return res.data;

}

//authentication ms functions

export async function singUp(account){
	let response = await axios.post(url+auth_ms_PORT+"/singUp",account)
	return response.data
}

export async function singIn(account){
	let response = await axios.post(url+auth_ms_PORT+"/singIn",account)
	return response.data
}

export async function singOut(token){
	const options ={	
		headers:{
			authorization:"Bearer "+token.token
		}
	}
	console.log(options.headers.authorization)
	let response = await axios.post(url+auth_ms_PORT+"/singOut","",options)
	return response.data

}

export async function authorization(token){
	const options ={
		headers:{
			authorization:"Bearer "+token.token
		}
	}
	let response = await axios.post(url+auth_ms_PORT+"/auth","",options)
	return response.data
}

//comunication ms function

export async function getChatbyId(id){
	let response = await axios.get(url+comu_ms_PORT+`/chat/${id}`)
	return response.data
}
export async function getChatsbynickName(nickName){
	let response = await axios.get(url+comu_ms_PORT+`/chats/${nickName}`)
	return response.data
}
export async function getMessagebyId(id){
	let response = await axios.get(url+comu_ms_PORT+`/message/${id}`)
	return response.data
}
export async function getMessagesbyChatId(chatId){
	let response = await axios.get(url+comu_ms_PORT+`/messages/${chatId}`)
	return response.data
}
export async function createChat(chat){
	let response = await axios.post(url+comu_ms_PORT+`/chat`,chat)
	return response.data
}
export async function deleteChat(id){
	let response = await axios.delete(url+comu_ms_PORT+`/chat/${id}`)
	return response.data
}
export async function createMessage(message){
	let response = await axios.post(url+comu_ms_PORT+`/message`,message)
	return response.data
}
export async function deleteMessage(id){
	let response = await axios.delte(url+comu_ms_PORT+`/message/${id}`)
	return response.data
}