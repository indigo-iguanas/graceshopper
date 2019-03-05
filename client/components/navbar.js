import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isRegisteredUser, isGuest, user}) => {
  return (
    <div>
      <nav className="columns" className="header">
        <div className="column" className="navbar-start">
          <img
            src="https://seeklogo.com/images/B/be-cool-logo-D08F2BAE07-seeklogo.com.png"
            className="image is-64x64"
            id="logo"
          />
          <h1 className="title is-2" id="logo-title">
            EMOTIONS &rsquo;Я&rsquo; US
          </h1>
        </div>
        {isRegisteredUser ? (
          <div className="column" className="navbar-end">
            <div>
              Welcome{' '}
              {user.email.toUpperCase().slice(0, user.email.lastIndexOf('@'))}!
            </div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">All Emotions</Link>
            <Link to="/profile">Profile</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <Link to="/cart">
              <img
                className="image is-48x48"
                src="http://www.clker.com/cliparts/z/w/u/l/v/F/marcs-shopping-cart-md.png"
              />
            </Link>
          </div>
        ) : isGuest ? (
          <div>
            {/* The navbar will show these links for guests */}
            <Link to="/">All Emotions</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">
              <img
                className="image is-48x48"
                src="http://www.clker.com/cliparts/z/w/u/l/v/F/marcs-shopping-cart-md.png"
              />
            </Link>
          </div>
        ) : (
          <div className="column" className="navbar-end">
            {/* The navbar will show these links before you log in */}
            <div>Welcome guest!</div>
            <Link to="/">All Emotions</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isRegisteredUser: !!state.user.id && !state.user.isGuest,
    isGuest: !!state.user.id && state.user.isGuest,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isRegisteredUser: PropTypes.bool.isRequired,
  isGuest: PropTypes.bool.isRequired
}
