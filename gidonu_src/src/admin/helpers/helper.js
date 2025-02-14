import axios from "axios";
import * as url from "./urlHelper";
let host = window.SERVER_URL;
//let host = "http://localhost:3000";

const getAllAdmins = async (setAdmins, setLoading) => {
  try {
    setLoading(true);
    const response = await axios.get(`${host}${url.GET_ALL_ADMINS}`);
    console.log(response?.data);
    
    const admins = response?.data;
    const typedAdmins = admins.map((user) => ({
        ...user,
        type: "user"
    }))
    
    setAdmins(typedAdmins);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  } finally {
    setLoading(false);
  }
};

export const getUser = async(id) => {
    const url = new URL(`${host}/api/admin/users/${id}`);

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
    };

    return await response.json();
}

const createUser = async (updateObj, setLoadingCreateUser) => {
  setLoadingCreateUser(true);
  try {
    await axios.post(`${host}/api/admin/users/`, updateObj);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  } finally {
    setLoadingCreateUser(false);
  }
};

const updateUser = async(id, name, email, isAdmin, isSuper, isTelegram, isActive) => {
  try {
    const data = { name: name, email: email, isAdmin: isAdmin, isSuper: isSuper, isTelegram: isTelegram, isActive: isActive };

    await axios.put(`${host}/api/admin/users/${id}`, data)
    .then(response => {
      console.log('Updated successfully:', response.data);
    });
  } catch(error) {
    console.log("Error updating user: ", error);
  }
}

export const deleteUser = async(id) => {
    try {
      const data = { id: id };
  
      await axios.delete(`${host}/api/admin/users/${id}`, data)
      .then(response => {
        console.log('Deleted successfully:', response.data);
      });
    } catch(error) {
      console.log("Error deleting user: ", error);
    }
  }

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

export {
  createUser,
  getAllAdmins,
  updateUser
};
