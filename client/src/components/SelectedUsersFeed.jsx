/*eslint-disable */

import React, { Component } from 'react';


const SelectedUsersFeed = ({ listToDisplay, removeUser, allUsersInLobby }) => {



  //in your component
  const addDefaultSrc = (ev) => {
    console.log('HELLO');
    //ev.target.src = 'some default image url'
  };

  return (
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
                  <img onError={addDefaultSrc}
                    className="img-rounded"
                    style={{ "width": "70px" }}
                    value={user}
                    src="hello"
                  />
                  <span value={user}>{user}</span>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
};

export default SelectedUsersFeed;

