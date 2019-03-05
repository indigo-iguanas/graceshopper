import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <div>
    <nav className="columns" className="header">
      <div className="column">
        <h1 className="title is-2">EMOTIONS 'Я' US</h1>
      </div>
      {isLoggedIn ? (
        <div className="column">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">All Emotions</Link>
          <Link to="/profile">Profile</Link>
          <h1>Welcome {user.email.slice(0, user.email.lastIndexOf('@'))}!</h1>
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
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/">All Emotions</Link>
          <Link to="/login">Login</Link>
          <h1>Welcome guest!</h1>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
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
  isLoggedIn: PropTypes.bool.isRequired
}
