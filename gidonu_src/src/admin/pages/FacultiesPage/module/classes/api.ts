// import host from "../../../module_global/host"

//let host = window.SERVER_URL;
let host = "http://localhost:3000";

export const getFaculties = async () => {
    try {
        const url = new URL(`${host}/api/faculties`);

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
        console.error('Error getting faculties: ', error);
        throw error;
    }
};

export const deleteFaculty = async(id: number) => {
    const url = new URL(`${host}/api/faculties/${id}`);

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

export const addFaculty = async(id: number, title: string | null, description: string | null, contacts: string | null) => {
    const url = new URL(`${host}/api/faculties`);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            title: title,
            description: description,
            contacts: contacts
        })
    });

    if(!response.ok){
        throw {
            response: await response.json(),
            message: new Error(`HTTP error. Status: ${response.status}`)
        };
    }

    return await response.json();
};

export const editFaculty = async(id: number, title: string | null, description: string | null, contacts: string | null) => {
    const url = new URL(`${host}/api/faculties/${id}`);

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            description: description,
            contacts: contacts
        })
    });

    if(!response.ok){
        throw {
            response: await response.json(),
            message: new Error(`HTTP error. Status: ${response.status}`)
        };
    }

    return await response.json();
}

export const getBuildings = async () => {
    try {
        const url = new URL(`${host}/api/buildings`);

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
        console.error('Error getting faculties: ', error);
        throw error;
    }
};

export const getBuildingsFacultiesDependences = async () => {
    try {
        const url = new URL(`${host}/api/buildings_faculties`);

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
        console.error('Error getting faculties: ', error);
        throw error;
    }
};

export const addBuildingsFacultiesDependence = async(id: number, id_buildings: number, id_faculties: number) => {
    const url = new URL(`${host}/api/buildings_faculties`);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            id_buildings: id_buildings,
            id_faculties: id_faculties,
        })
    });

    if(!response.ok){
        throw {
            response: await response.json(),
            message: new Error(`HTTP error. Status: ${response.status}`)
        };
    }

    return await response.json();
};

export const deleteBuildingsFacultiesDependency = async(id: number) => {
    const url = new URL(`${host}/api/buildings_faculties/${id}`);

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
}