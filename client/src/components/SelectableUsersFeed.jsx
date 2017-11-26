/*eslint-disable */

import React, { Component } from 'react';


const SelectableUsersFeed = ({listToDisplay, selectUser, allUsersInLobby}) => (
  <table className="table table-hover table-bordered">
    <thead>
      <tr>
        <th scope="colSpan">Users</th>
      </tr>
    </thead>
    <tbody>
      {
        listToDisplay.map((user, index) => {
          return (
            <tr key={index}>
              <td onClick={selectUser} value={user}>
                <img src={allUsersInLobby[user]}
                  className="img-rounded"
                  style={{ "width": "70px" }}
                  value={user}
                />
                <span value={user}>{user}</span>
              </td>
            </tr>
          )
        })
      }
    </tbody>
  </table>
);


export default SelectableUsersFeed;

