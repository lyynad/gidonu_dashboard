// import host from "../../../module_global/host";

const host = window.SERVER_URL;
//let host = "http://localhost:3000";

export const getLogs = async () => {
    try {
    const url = new URL(`${host}/api/logs`);

    const response = await fetch(url, {
        method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
    });

    if(!response.ok){
            throw {
                response: await response.json(),
                message: new Error(`HTTP error. Status: ${response.status}`)
            };
        }
    
        return await response.json();
    } catch(error) {
        console.error('Error getting logs: ', error);
        throw error;
    }
};

export const deleteLog = async (id: number) => {
    const url = new URL(`${host}/api/logs/${id}`);

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if(!response.ok){
        throw {
            response: await response.json(),
            message: new Error(`HTTP error. Status: ${response.status}`)
        };
    }

    return await response.json();
};