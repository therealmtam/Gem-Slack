/*eslint-disable */

import React, { Component } from 'react';


const SelectedUsersFeed = ({ listToDisplay, removeUser, allUsersInLobby }) => (
    <table className="table table-hover table-bordered">
      <thead>
        <tr>
          <th scope="colSpan">Selected Users</th>
        </tr>
      </thead>
      <tbody>
        {
          listToDisplay.map((user, index) => {
            return (
              <tr key={index}>
                <td onClick={removeUser} value={user}>
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



export default SelectedUsersFeed;

