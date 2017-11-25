/*eslint-disable */

import React, { Component } from 'react';


const SelectableUsersFeed = ({listToDisplay, selectUser}) => (
  <div>
    {
      listToDisplay.map((user, index) => {
        return (
          <div key={index}>
            <input type="button" onClick={selectUser} value={user} />
          </div>
        )
      })
    }
  </div>
);




export default SelectableUsersFeed;