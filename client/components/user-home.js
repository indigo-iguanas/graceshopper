import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Emotions} from '../components'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {displayName} = props

  return (
    <div>
      <h3>Welcome, {displayName}</h3>
      <Emotions />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    displayName: state.user.getDisplayName()
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  displayName: PropTypes.string
}
