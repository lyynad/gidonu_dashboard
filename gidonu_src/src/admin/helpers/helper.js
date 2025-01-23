import axios from "axios";
import * as url from "./urlHelper";

const BASE_URL = url.BASE_URL;

let host = window.SERVER_URL;
//let host = "http://localhost:3000";

const getAllAdmins = async (setAdmins, setLoading) => {
  try {
    setLoading(true);
    const response = await axios.get(`${BASE_URL}${url.GET_ALL_ADMINS}`);
    console.log(response?.data);
    setAdmins(response?.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  } finally {
    setLoading(false);
  }
};

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

export const deleteFaculty = async(id) => {
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

export const addFaculty = async(id, title, description, contacts) => {
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

export const editFaculty = async(id, title, description, contacts) => {
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
        console.error('Error getting buildings: ', error);
        throw error;
    }
};

export const addBuilding = async(id, title, description, address, floor_amount) => {
    const url = new URL(`${host}/api/buildings`);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            title: title,
            description: description,
            address: address,
            floor_amount: floor_amount
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

export const editBuilding = async(id, title, description, address, floor_amount) => {
    const url = new URL(`${host}/api/buildings/${id}`);

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            description: description,
            address: address,
            floor_amount: floor_amount
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

export const deleteBuilding = async(id) => {
    const url = new URL(`${host}/api/buildings/${id}`);

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

export const addBuildingsFacultiesDependence = async(id, id_buildings, id_faculties) => {
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

export const deleteBuildingsFacultiesDependency = async(id) => {
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

const createUser = async (updateObj, setLoadingCreateUser) => {
  setLoadingCreateUser(true);
  try {
    await axios.post(`http://localhost:3000/api/admin/users/`, updateObj);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  } finally {
    setLoadingCreateUser(false);
  }
};

const updateUser = async(id, name, email, isAdmin, isSuper) => {
  try {
    const data = {name: name, email: email, isAdmin: isAdmin, isSuper: isSuper};

    await axios.put(`${BASE_URL}/api/admin/users/${id}`, data)
    .then(response => {
      console.log('Updated successfully:', response.data);
    });
  } catch(error) {
    console.log("Error updating user: ", error);
  }
}

export {
  createUser,
  getAllAdmins,
  updateUser
};
