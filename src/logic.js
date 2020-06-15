const axios = require('axios');

const url = "http://192.168.99.114:";
const url_user = "3000/gatherme-users-ms";
const auth_ms_PORT = '3001'
const comu_ms_PORT = '3002'
const sugg_ms_PORT = '80'
const req_ms_PORT = '4444'
const req_entrypoint = 'gatherme-requests'


export async function getUserByID(id) {
	let res = await axios.get(url + url_user + "/user-id/" + id)
	return res.data

}

export async function getLikeByID(id) {
	let res = await axios.get(url + url_user + "/like-id/" + id)
	return res.data

}

export async function getUserByUsername(username) {
	let res = await axios.get(url + url_user + "/user-username/" + username)
	return res.data[0]

}

export async function getUserByEmail(email) {
	let res = await axios.get(url + url_user + "/user-email/" + email)
	return res.data[0]

}


export async function getLikesByCategory(category) {
	let res = await axios.get(url + url_user + "/like-category/" + category)
	return res.data
}


export async function createUser(body) {
	let res = await axios.post(url + url_user + "/create-user", body);
	return res.data;

}

//Usar cuando el like ya exista
export async function addLikeToUser(like, username,token) {
	let auth = await Isauth(token);
	if(auth){
		
		let user = await getUserByUsername(username);
		user.likes.push(like);
		let update = await updateUser(user);
		let inputSugg ={
			user:{
				id: user.id
			},
			likes:[{name: like}]		
		}
		console.log(inputSugg)
		let updateSugg = await sugg_newLike(inputSugg)
		console.log(updateSugg)
		return updateSugg;
	}
	else{
		let error = {
			error: "El usuario no esta autenticado"
		}
		return error;
	}

	

}

export async function createLike(body,username,token) {
	let auth = await Isauth(token);
	if(auth){
		let sugg = {
			name : body.name
		}
		let suggLike = await sugg_createLike(sugg)
		console.log(suggLike)
		let relationInput = {
			like: {
				name: body.name
			},
			category:{
				name: body.category
			}
		}
		let relationLike = await sugg_newIs(relationInput)
		console.log(relationLike)
		let res = await axios.post(url + url_user + "/create-like", body);
		let adduser = await addLikeToUser(body.name,username,token)
		console.log(adduser)
	
		return res.data;

	}
	else {
		let error = {
			error: "El usuario no esta autenticado"
		}
		return error;
	}

	

}

export async function updateUser(body) {

	let res = await axios.put(url + url_user + "/update-user", body);
	return res.data;

}
export async function test(body) {

let res = await addComunityToUser(body.activities,body.username,body.token);
return res;
}



export async function addActivityToUser(activities, username, token) {
	let auth = await Isauth(token);
	if (auth) {
		let user = await getUserByUsername(username);
		user.activities.push(activities);
		let update = await updateUser(user);
		return update;
	}
	else {
		let error = {
			error: "El usuario no esta autenticado"
		}
		return error;
	}

}

export async function addComunityToUser(comunity, username, token) {
	let auth = await Isauth(token);
	if (auth) {
		let user = await getUserByUsername(username);
		user.communities.push(comunity);
		let update = await updateUser(user);
		return update;
	}
	else {
		let error = {
			error: "El usuario no esta autenticado"
		}
		return error;
	}

}



export async function addGatherToUser(gather, username, token) {
	let auth = await Isauth(token);
	if (auth) {
		let user = await getUserByUsername(username);
		user.gathers.push(gather);
		let update = await updateUser(user);
		return update;
	}
	else {
		let error = {
			error: "El usuario no esta autenticado"
		}
		return error;
	}

}




export async function updateLike(body) {

	let res = await axios.put(url + url_user + "/update-like", body);
	return res.data;

}

export async function deleteUser(body) {

	let res = await axios.delete(url + url_user + "/delete-user", { data: body });

}


export async function deleteLike(body) {

	let res = await axios.delete(url + url_user + "/delete-like", { data: body });

}




//authentication ms functions

export async function singUp(account) {
	let response = await axios.post(url + auth_ms_PORT + "/singUp", account)
	return response.data
}

export async function singIn(account) {
	let response = await axios.post(url + auth_ms_PORT + "/singIn", account)
	return response.data
}

export async function singOut(token) {
	const options = {
		headers: {
			authorization: "Bearer " + token.token
		}
	}
	console.log(options.headers.authorization)
	let response = await axios.post(url + auth_ms_PORT + "/singOut", "", options)
	return response.data

}

export async function authorization(token) {
	const options = {
		headers: {
			authorization: "Bearer " + token.token
		}
	}
	let response = await axios.post(url + auth_ms_PORT + "/auth", "", options)
	return response.data
}

export async function Isauth(tokenI) {
	let tokenBody = {
		token: tokenI
	}
	let response = await authorization(tokenBody);
	console.log(response);
	console.log(typeof response.authorization)
	if (response.authorization) {
		return true;
	}
	else {
		return false;
	}

}

//comunication ms function

export async function getChatbyId(id) {
	let response = await axios.get(url + comu_ms_PORT + `/chat/${id}`)
	return response.data
}
export async function getChatsbynickName(nickName) {
	let response = await axios.get(url + comu_ms_PORT + `/chats/${nickName}`)
	return response.data
}
export async function getMessagebyId(id) {
	let response = await axios.get(url + comu_ms_PORT + `/message/${id}`)
	return response.data
}
export async function getMessagesbyChatId(chatId) {
	let response = await axios.get(url + comu_ms_PORT + `/messages/${chatId}`)
	return response.data
}
export async function createChat(chat) {
	console.log(chat);
	let response = await axios.post(url + comu_ms_PORT + `/chat`, chat)
	console.log(response.data);
	return response.data.chatStrored
}
export async function deleteChat(id) {
	let response = await axios.delete(url + comu_ms_PORT + `/chat/${id}`)
	return response.data
}
export async function createMessage(message) {
	let response = await axios.post(url + comu_ms_PORT + `/message`, message)
	console.log(response.data);
	return response.data.messageStrored
}
export async function deleteMessage(id) {
	let response = await axios.delte(url + comu_ms_PORT + `/message/${id}`)
	return response.data
}
///---------Activity-------///

export async function getActivityByID(url) {
	console.log(url);
	let res = await axios.get(url);
	return res.data;
}

export async function getAllActivities(url) {
	console.log(url);
	let res = await axios.get(url);
	return res.data;
}

export async function createActivity(url, body, token){
	console.log(url);
	console.log(body.informacion);
	let res = await axios.post(url, body);
	console.log(res.data)
	let messa = await addActivityToUser(res.data.id, res.data.administrador, token);
	console.log(messa)
	let sta;
	if(messa.error == null){
		sta = {
			id: res.data.id
		}
	}else{
		sta = null;
	}

	return sta;
}
export async function updateActivity(url, body) {
	console.log(url);
	console.log(body);
	let res = await axios.put(url, body);
	console.log(res.data.id)
	let sta = {
		id: res.data.id
	}
	return sta;

}

export async function commentActivity(url, body) {
	console.log(url);
	console.log(body);
	let res = await axios.put(url, body);
	console.log(res.status)
	let sta = {
		Status: res.status
	}
	return sta;
}

export async function addMember(url, id, user, token){
	console.log(url);
	let res = await axios.put(url);
	console.log(res.data.id);
	let messa = await addActivityToUser(id, user, token);
	let sta;
	if(messa.error == null){
		sta = {
			id: res.data.id
		}
	}else{
		sta = null;
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

export async function getActivitiesByCategory(url){
	let res = await axios.get(url);
	return res.data;
}

export async function getActivitiesByLike(url){
	let res = await axios.get(url);
	return res.data;
}


/*----------Requests----------*/
//Queries
export async function sentRequests (user) {
	console.log(user)
	let res = await axios.get(`${url}${req_ms_PORT}/${user.user}/${req_entrypoint}/sent`);
	console.log(res.data)
	let aux = [ {
		id: 343,
		user_origin: "String!",
		user_destination: "String!",
		status: "String!",
		send_date:" String!"
	}]
	return res.data;
}

export async function inboxRequests (user) {
	let res = await axios.get(`${url}${req_ms_PORT}/${user.user}/${req_entrypoint}/inbox`);
	console.log(res.data);
	return res.data;
}

//Mutations
export async function createRequest (body) {
	let destination = {	user_destination: body.user_destination };
	let res = await axios.post(`${url}${req_ms_PORT}/${body.user_origin}/${req_entrypoint}/create`, destination);
	let ans = { result: res.statusText };
	return ans;
}

export async function acceptRequest (body) {
	let auth = await Isauth(body.token);
	if(auth) {
		let origin = { user_origin: body.user_origin };
		let res = await axios.put(`${url}${req_ms_PORT}/${body.user_destination}/${req_entrypoint}/accept`, origin);
		let u1 = await addGatherToUser(body.user_origin, body.user_destination, body.token);
		let u2 = await addGatherToUser(body.user_destination, body.user_origin, body.token);
		let ans = { result: res.statusText };
		return ans;
	}
	else {
		let error = { error: "El usuario no esta autenticado" };
		return error;
	}
}

export async function rejectRequest (body) {
	let origin = { user_origin: body.user_origin };
	let res = await axios.put(`${url}${req_ms_PORT}/${body.user_destination}/${req_entrypoint}/reject`, origin);
	let ans = { result: res.statusText };
	return ans;
}

export async function eraseRequest (body) {
	let destination = { user_destination: body.user_destination };
	let res = await axios.delete(`${url}${req_ms_PORT}/${body.user_origin}/${req_entrypoint}/delete`, destination);
	let ans = { result: res.statusText };
	return ans;
}

/*================Suggestions=================*/
//User
export async function sugg_getUsers() {
	let res = await axios.get(url + sugg_ms_PORT + '/User');
	return res.data;
}
export async function sugg_newUser(user) {
	let res = await axios.post(`${url}${sugg_ms_PORT}/User/NewUser`, user);
	return res.data;
}
export async function sugg_newGather(userInfo) {
	let res = await axios.post(`${url}${sugg_ms_PORT}/User/NewGather`, userInfo);
	return res.data;
}
//--->Nueva relación LIKE con un nodo like
export async function sugg_newLike(userInfo) {
	let res = await axios.post(`${url}${sugg_ms_PORT}/User/NewLike`, userInfo);
	return res.data;
}
export async function sugg_usersLikes(id){
	let res = await axios.get(`${url}${sugg_ms_PORT}/User/UsersLikes?id=${id}`);
	return res.data;
}
//like
export async function sugg_getLikes() {
	let res = await axios.get(url + sugg_ms_PORT + '/Like');
	return res.data;
}
export async function sugg_filterByLike(name) {
	let res = await axios.get(`${url}${sugg_ms_PORT}/Like/FilterByLike?name=${name}`);
	return res.data;
}
export async function sugg_existLike(name) {
	let res = await axios.get(`${url}${sugg_ms_PORT}/Like/ExistLike?name=${name}`);
	return res.data;
}
//--->Nuevo nodo Like
export async function sugg_createLike(like) {
	let res = await axios.post(`${url}${sugg_ms_PORT}/Like/NewLike`, like);
	return res.data;
}
export async function sugg_newIs(likeInfo) {
	let res = await axios.post(`${url}${sugg_ms_PORT}/Like/NewIs`, likeInfo);
	return res.data;
}
//category
export async function sugg_getCategories() {
	let res = await axios.get(url + sugg_ms_PORT + '/Category');
	return res.data;
}
export async function sugg_filterByCategory(name) {
	let res = await axios.get(`${url}${sugg_ms_PORT}/Category/FilterByCategory?name=${name}`);
	return res.data;
}
export async function sugg_newCategory(category) {
	let res = await axios.post(`${url}${sugg_ms_PORT}/Category/NewCategory`, category);
	return res.data;
}
export async function sugg_likeByCategory(category){
	let res = await axios.get(`${url}${sugg_ms_PORT}/Category/LikeByCategory?name=${category}`);
	return res.data;
}
async function sugg_existCategory(name){
	let res = await axios.get(`${url}${sugg_ms_PORT}/Category/ExistCategory?name=${name}`);
	return res.data;
}
//suggestion
export async function sugg_getSuggestions() {
	let res = await axios.get(url + sugg_ms_PORT + '/Suggestion');
	return res.data;
}
export async function sugg_getSuggestion(id){
	let res = await axios.get(`${url}${sugg_ms_PORT}/Suggestion/GetSuggestion?id=${id}`);
	return res.data;
}
export async function sugg_createSuggest(user) {
	let res = await axios.post(`${url}${sugg_ms_PORT}/Suggestion/CreateSuggest`, user);
	return res.data;
}
export async function sugg_deactivate(suggestion) {
	let res = await axios.put(`${url}${sugg_ms_PORT}/Suggestion/Deactivate`, suggestion);
	return res.data;
}
//report
export async function sugg_getAllReports(){
	let res = await axios.get(`${url}${sugg_ms_PORT}/Report`);
	return res.data;
}
export async function sugg_newReport(reportInfo) {
	let res = await axios.post(`${url}${sugg_ms_PORT}/Report`, reportInfo);
	return res.data;
}
/*--------------compose methods--------------------*/
export async function register(user) {
	let account = {
		email: user.email,
		nickName: user.username,
		password: user.password
	}
	let userBody = {
		username: user.username,
		email: user.email,
		name: user.name,
		picture: user.picture,
		description: user.description,
		gender: user.gender,
		age: user.age,
		city: user.city,
		likes: user.likes,
		communities: user.communities,
		activities: user.activities,
		gathers: user.gathers
	}

	let singupResponse = await singUp(account)
	console.log("singUp successful");

	if (singupResponse.email != null) {
		let userResponse = await createUser(userBody)
		let userSug ={
			id:userResponse.id,
			name: userResponse.username
		}
		let suggResponse = await sugg_newUser(userSug)
		console.log(suggResponse)
		userResponse.token = singupResponse.token;
		console.log("Create user successful");
		return userResponse
	}

}
