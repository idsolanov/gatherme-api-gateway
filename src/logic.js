const axios = require('axios');

const url= 'http://172.17.0.1:'
const auth_ms_PORT= '3001/'

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