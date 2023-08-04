import {Link} from 'react-router-dom'

import './index.css'

const TotalStats = props => {
  const {data} = props
  const {
    stateName,
    stateCode,
    confirmed,
    other,
    deceased,
    recovered,
    population,
  } = data
  const active = confirmed - recovered - deceased - other
  return (
    <li className="all-list-item" key={stateCode}>
      <div className="states-name-container">
        <Link to={`/state/${stateCode}`} className="nav-link">
          <p className="state-name-home">{stateName}</p>
        </Link>
      </div>
      <div className="home-columns">
        <p className="home-confirmed">{confirmed}</p>
      </div>
      <div className="home-columns">
        <p className="home-active">{active}</p>
      </div>
      <div className="home-columns">
        <p className="home-recovered">{recovered}</p>
      </div>
      <div className="home-columns">
        <p className="home-deceased">{deceased}</p>
      </div>
      <div className="home-columns">
        <p className="home-population">{population}</p>
      </div>
    </li>
  )
}

export default TotalStats
