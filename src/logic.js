const axios = require('axios');

const url= 'http://172.17.0.1:'
const auth_ms_PORT= '3001/'
const comu_ms_PORT= '3002/'

export async function getUser(url) {

	let res = await axios.get(url);
	return res.data;

}


export async function updateUser(url, body) {

	let res = await axios.put(url, body);
	return res.data;

}

export async function deleteUser(url, { data: body }) {
	console.log(body);
	console.log(url);

	let res = await axios.delete(url, body);
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
///---------Activity-------///

export async function getActivityByID(url) {
	console.log(url);
	let res = await axios.get(url);
	return res.data;
}

export async function getAllActivities(url){
	console.log(url);
	let res = await axios.get(url);
	return res.data;
}

export async function createActivity(url, body){
	console.log(url);
	console.log(body.informacion);
	let res = await axios.post(url, body);
	console.log(res.status)
	let sta = {
		Status: res.status
	}
	return sta;
}
export async function updateActivity(url, body){
	console.log(url);
	console.log(body);
	let res = await axios.put(url, body);
	console.log(res.status)
	let sta = {
		Status: res.status
	}
	return sta;

}

export async function commentActivity(url, body){
	console.log(url);
	console.log(body);
	let res = await axios.put(url, body);
	console.log(res.status)
	let sta = {
		Status: res.status
	}
	return sta;
}

export async function deleteActivity(url){
	let res = await axios.delete(url);
	let sta = {
		Status: res.status
	}
	return sta;

}
/*================Suggestions=================*/
export async function sugg_getUsers(url) {
	let res = await axios.get(url);
	return res.data;
}
export async function sugg_getLikes(url) {
	let res = await axios.get(url);
	return res.data;
}
export async function sugg_filterByLike(url) {
	let res = await axios.get(url);
	return res.data;
}
export async function sugg_getCategories(url) {
	let res = axios.get(url);
	return res.data;
}
export async function sugg_filterByCategory(url){
	let res = axios.get(url);
	return res.data;
}
export async function sugg_getSuggestions(url){
	let res = axios.get(url);
	return res.data;
}
export async function sugg_createSuggest(url,body){
	let res = axios.post(url,body);
	return res.data;
}