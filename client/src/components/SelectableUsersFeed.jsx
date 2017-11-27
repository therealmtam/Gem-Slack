import React from 'react';
import PropTypes from 'prop-types';

/**
 * Description:
 * SelectableUsersFeed component renders a Table of all selectable
 * users and their profile pictures for the NewDirectMsg component.
 *
 * @prop {Array} listToDisplay - Array passed in by App component.
 * @prop {Function} selectUser - Function passed in by App component.
 * @prop {Object} allUsersInLobby - Object passed in by App component.
 */
const SelectableUsersFeed = ({ listToDisplay, selectUser, allUsersInLobby }) => (
  <table className="table table-hover table-bordered">
    <thead>
      <tr>
        <th scope="colSpan">Users</th>
      </tr>
    </thead>
    <tbody>
      {
        listToDisplay.map((user, index) => (
          <tr key={index}>
            <td onClick={selectUser} value={user}>
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

SelectableUsersFeed.propTypes = {
  listToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectUser: PropTypes.func.isRequired,
  allUsersInLobby: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default SelectableUsersFeed;

