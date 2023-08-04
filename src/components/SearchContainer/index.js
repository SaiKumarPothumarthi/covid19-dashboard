import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const SearchContainer = props => {
  const {stateName, id, stateCode} = props

  return (
    <>
      <li className="search-list-Item">
        <Link to={`/state/${id}`} className="nav-link">
          <h1 className="search-name">{stateName}</h1>
          <button type="button" className="search-item-button">
            {stateCode}
            <BiChevronRightSquare
              testid="searchResultChevronRightIcon"
              className="search-item-icon"
              alt="line icon"
            />
          </button>
        </Link>
      </li>
      <hr className="separator" />
    </>
  )
}

export default SearchContainer
