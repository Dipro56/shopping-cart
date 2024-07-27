import { getCookie } from "typescript-cookie";

let apiServices = {}

apiServices.allProducts = async () => {
    let url = `${process.env.BASE_API}/products?limit=150`;
    console.log(url);
    let response = await fetch(url).then(response => response.json()).catch(error => error)
    return response;
}

apiServices.searchedProducts = async (query, order) => {
    let url = `${process.env.NEXT_PUBLIC_BASE_API}/products/search?limit=200&`;
    if (query && !order) {
        url += `q=${query}`;
    } else if (!query && order) {
        url += `sortBy=price&order=${order}`;
    } else if (query && order) {
        url += `q=${query}&sortBy=price&order=${order}`;
    } else {
        url += `&sortBy=price`;
    }
    let response = await fetch(url).then(response => response.json()).catch(error => error)
    return response;

}


apiServices.login = async (username, password) => {
    let url = `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username,
            password,
            expiresInMins: 30,
        }),
    }).then(response => response.json()).catch(error => error.response);

    return response
}

apiServices.getAuthUser = async () => {
    let url = `${process.env.BASE_API}/user/me`;
    let authCookie = getCookie('amh');
    if (authCookie) {
        let response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${authCookie}`
            },
        }).then(response => response.json()).catch(error => error)
        return response;

    }

}


export default apiServices