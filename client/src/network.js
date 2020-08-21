import requester from "easier-requests";

import {
  store,
  // ADD_FRIEND,
  // ADD_FRIEND_FAILURE,
  // ADD_FRIEND_SUCCESS,
  // GET_FRIENDS,
  // GET_FRIENDS_FAILURE,
  // GET_FRIENDS_SUCCESS,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SET_LOGGED_IN,
} from "./reducer.js";

let headers;

// export function addFriend(friend) {
//   return function (dispatch) {
//     async function _addFriend() {
//       try {
//         const id = requester.createUniqueID();
//         await requester.post("http://localhost:5000/api/friends", id, friend);
//         const friends = requester.response(id).data;
//         dispatch({ type: ADD_FRIEND_SUCCESS, friends: friends });
//       } catch (error) {
//         console.log(error);
//         dispatch({ type: ADD_FRIEND_FAILURE, error: error });
//       }
//     }
//     dispatch({ type: ADD_FRIEND });
//     _addFriend();
//   };
// }

// export function getFriends() {
//   return function (dispatch) {
//     async function _getFriends() {
//       try {
//         const id = requester.createUniqueID();
//         await requester.get("http://localhost:5000/api/friends", id);
//         const friends = requester.response(id).data;
//         dispatch({ type: GET_FRIENDS_SUCCESS, friends: friends });
//       } catch (error) {
//         console.log(error);
//         dispatch({ type: GET_FRIENDS_FAILURE, error: error });
//       }
//     }
//     dispatch({ type: GET_FRIENDS });
//     _getFriends();
//   };
// }

export function login(username, password, history) {
  return function (dispatch) {
    async function _login() {
      try {
        const id = requester.createUniqueID();
        await requester.post("http://localhost:5000/api/login", id, {
          username: username,
          password: password,
        });

        const token = requester.response(id).data.payload;
        headers = { Authorization: token };
        localStorage.setItem("Authorization", JSON.stringify(headers));
        requester.setOptions({ headers: headers });
        dispatch({ type: LOGIN_SUCCESS });
        window.open("/");
      } catch (error) {
        console.log(error);
        dispatch({ type: LOGIN_FAILURE, error: error });
      }
    }
    dispatch({ type: LOGIN });
    _login();
  };
}

function _inititalizeNetwork() {
  headers = JSON.parse(localStorage.getItem("Authorization"));
  store.dispatch({ type: SET_LOGGED_IN, state: headers ? true : false });
  if (headers) requester.setOptions({ headers: headers });
}

_inititalizeNetwork();
