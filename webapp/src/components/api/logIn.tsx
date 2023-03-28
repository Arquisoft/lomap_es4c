


class UserFunctionality {
	async addUser(webId: string,name: string,email: string){
		const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
		let response = await fetch(apiEndPoint+'/user/add', {
	method: 'POST',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({'webId':webId,'name':name,'email':email})
		  })
		  console.log(response.json());
		return await response.json()
	}

}
export default UserFunctionality;
