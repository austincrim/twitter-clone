export async function fetcher(url: string, data = undefined) {
    const response = await fetch(window.location.origin + url, {
        method: data ? "POST" : "GET",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    })

    return await response.json();
}