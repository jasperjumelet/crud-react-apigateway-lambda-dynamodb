import http from "../http-common";

const getAll = () => {
  return http.get("/items");
};

const get = (id) => {
  return http.get(`/items/${id}`);
}

const create = (data) => {
  return http.put("/items", data);
};

const update = (id, data) => {
  return http.put(`/items/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/items/${id}`);
};

// this still needs implementing in the apigateway and lambda
const removeAll = () => {
  return http.delete(`/items`);
};

// also still needs implementing in the apigateway and lambda
const findById = (id) => {
  return http.get(`/items?id=${id}`);
};

const ItemService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findById
};

export default ItemService;