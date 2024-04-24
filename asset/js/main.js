async function getUsers() {
    return await api.post(API_BASE_URL + '/register');
}

getUsers().then(r => console.log(r));
