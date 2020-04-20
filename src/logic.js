const axios = require('axios');

const url = "http://172.17.0.1:";
const url_user = "3000/gatherme-users-ms";


export async function getUserByID(id) {
	let res = await axios.get(url + url_user +"/user-id/"+id)
	return res.data

}

export async function getLikeByID(id) {
	let res = await axios.get(url + url_user +"/like-id/"+id)
	return res.data

}

export async function getUserByUsername(username) {
	let res = await axios.get(url + url_user +"/user-username/"+username)
	return res.data[0]

}

export async function getLikesByCategory(category) {	
	let res = await axios.get(url + url_user +"/like-category/"+category)
	return res.data
}


export async function createUser(body) {
	let res = await axios.post(url + url_user +"/create-user",body);
	return res.data;

}

export async function createLike(body) {
	let res = await axios.post(url + url_user +"/create-like",body);
	return res.data;

}

export async function updateUser(body) {

	let res = await axios.put(url + url_user +"/update-user",body);
	return res.data;

}

export async function updateLike(body) {

	let res = await axios.put(url + url_user +"/update-like",body);
	return res.data;

}

export async function deleteUser(body) {

	let res = await axios.delete(url + url_user +"/delete-user",{data: body});
	return res.data;

}

export async function deleteLike(body) {

	let res = await axios.delete(url + url_user +"/delete-like",{data: body});
	return res.data;

}