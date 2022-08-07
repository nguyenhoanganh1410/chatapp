import firebase from "../firebase";
const db = firebase.firestore().collection("/users");
const getById = (id) => {
  return db.doc(id).get();
};
const create = (data) => {
  return db.add(data);
};
const update = (id, value) => {
  return db.doc(id).update(value);
};
const remove = (id) => {
  return db.doc(id).delete();
};
const UserService = {
  getById,
  create,
  update,
  remove,
};
export default UserService;
