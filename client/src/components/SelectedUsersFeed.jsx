import React from 'react';
import PropTypes from 'prop-types';

/**
 * Description:
 * SelectedUsersFeed component renders a Table of all selected
 * users and their profile pictures for the NewDirectMsg component.
 *
 * @prop {Array} listToDisplay - Array passed in by App component.
 * @prop {Function} removeUser - Function passed in by App component.
 * @prop {Object} allUsersInLobby - Object passed in by App component.
 */
const SelectedUsersFeed = ({ listToDisplay, removeUser, allUsersInLobby }) => (
  <table className="table table-hover table-bordered">
    <thead>
      <tr>
        <th scope="colSpan">Selected Users</th>
      </tr>
    </thead>
    <tbody>
      {
        listToDisplay.map((user, index) => (
          <tr key={index}>
            <td onClick={removeUser} value={user}>
              <img
                src={allUsersInLobby[user]}
                className="img-rounded"
                style={{ width: '70px' }}
                value={user}
                alt="Profile Pic"
              />
              <span value={user}>{user}</span>
            </td>
          </tr>
        ))
      }
    </tbody>
  </table>
);

SelectedUsersFeed.propTypes = {
  listToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeUser: PropTypes.func.isRequired,
  allUsersInLobby: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default SelectedUsersFeed;

