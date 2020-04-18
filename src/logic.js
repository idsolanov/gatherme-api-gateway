const axios = require('axios');


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