import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="NotFoundContainer">
    <img
      src="https://res.cloudinary.com/dadmzulfj/image/upload/v1689961039/Group_7484_mv3pzw.png"
      alt="ot-found-pic"
      className="not-found-img"
    />
    <h1 className="not-found-heading">PAGE NOT FOUND</h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found
    </p>
    <Link to="/" className="nav-link">
      <button type="button" className="Not-found-home-button">
        Home
      </button>
    </Link>
  </div>
)

export default NotFound
