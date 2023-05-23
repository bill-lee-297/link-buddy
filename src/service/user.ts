type OAuthUser = {
    id: string;
    name?: string;
    email?: string;
    image?: string;
};

export default async function addUser(user: OAuthUser) {
    console.log('add User ', user);

    const data = await fetch('/api/user', {
        method: 'GET'
    });
    console.log(data);

    console.log('addUser :: ', data);

    return data;
}
