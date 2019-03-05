import React from 'react'
//TODO import PropTypes from 'prop-types'
//TODO import {connect} from 'react-redux'
import {Emotions} from '../components'

/**
 * COMPONENT
 */
export const UserHome = () => {
  return (
    <div>
      <Emotions />
    </div>
  )
}

/**
 * CONTAINER
 */
/* TODO - DON'T NEED
const mapState = state => {
  return {
    displayName: state.user.email || 'Guest' // TODO why isn't getDisplayName() defined here? Is state.user not a User object?
  }
}
*/
export default UserHome //connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
/* TODO DONT NEED
UserHome.propTypes = {
  displayName: PropTypes.string
}
*/
