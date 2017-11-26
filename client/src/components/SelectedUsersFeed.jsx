/*eslint-disable */

import React, { Component } from 'react';


const SelectedUsersFeed = ({ listToDisplay, removeUser }) => (
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
                  <img src="http://www.thumbshots.com/portals/0/Images/StayLonger.png"
                    className="img-rounded"
                    style={{"width":"70px"}}
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

