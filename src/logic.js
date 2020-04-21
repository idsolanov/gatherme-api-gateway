const axios = require('axios');


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