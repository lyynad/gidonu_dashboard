import axios from "axios";
import * as url from "./urlHelper";

const BASE_URL = url.BASE_URL;

const getBuildings = async (setBuildings, setLoading) => {
  try {
    setLoading(true);
    const response = await axios.get("http://localhost:3000/api/buildings");
    setBuildings(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  } finally {
    setLoading(false);
  }
};

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

const getBuildingInfo = async (setBuildingInfo, setLoadingBuildingInfo, id) => {
  try {
    setLoadingBuildingInfo(true);
    const response = await axios.get(
      `http://localhost:3000/api/buildings/${id}`
    );
    setBuildingInfo(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  } finally {
    setLoadingBuildingInfo(false);
  }
};

const getBuildingFloorInfo = async (
  setBuildingFloorInfo,
  setLoadingBuildingFloorInfo,
  id,
  floor
) => {
  try {
    setLoadingBuildingFloorInfo(true);
    const response = await axios.get(
      `http://localhost:3000/api/floor/map?buildingId=${id}&floor=${floor}`
    );
    setBuildingFloorInfo(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  } finally {
    setLoadingBuildingFloorInfo(false);
  }
};

const updateBuildingInfo = async (id, updateObj, setLoadingUpdateBuilding) => {
  try {
    setLoadingUpdateBuilding(true);
    await axios.post(
      `http://localhost:3000/api/buildings/${id}?title=${updateObj.title}&floor_amount=${updateObj.floor_amount}&description=${updateObj.description}&address=${updateObj.address}`
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  } finally {
    setLoadingUpdateBuilding(false);
  }
};

const deleteBuilding = async (id, setLoadingDeleteBuilding) => {
  try {
    setLoadingDeleteBuilding(true);
    await axios.delete(`http://localhost:3000/api/buildings/${id}`);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  } finally {
    setLoadingDeleteBuilding(false);
  }
};

const addNewBuilding = async (updateObj, setLoadingAddBuilding, buildings) => {
  setLoadingAddBuilding(true);
  try {
    await axios.patch(
      `http://localhost:3000/api/buildings?title=${updateObj.title}&floor_amount=${updateObj.floor_amount}&description=${updateObj.description}&address=${updateObj.address}`
    );
    buildings.push(updateObj);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  } finally {
    setLoadingAddBuilding(false);
  }
};

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

const updateUser = async(id, name, email) => {
  try {
    const data = {name: name, email: email};

    await axios.put(`${BASE_URL}/api/admin/users/${id}`, data)
    .then(response => {
      console.log('Updated successfully:', response.data);
    });
  } catch(error) {
    console.log("Error updating user: ", error);
  }
}

export {
  getBuildings,
  getBuildingInfo,
  getBuildingFloorInfo,
  deleteBuilding,
  updateBuildingInfo,
  addNewBuilding,
  createUser,
  getAllAdmins,
  updateUser
};
