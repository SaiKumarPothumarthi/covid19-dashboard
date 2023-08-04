/* eslint-disable react/no-unknown-property */
import {Component} from 'react'

import './index.css'

class StatesTotal extends Component {
  state = {
    activeCases: {},
    recoveredCases: {},
    confirmedCases: {},
    deceasedCases: {},
  }

  componentDidMount() {
    this.getStateDetails()
  }

  getStateDetails = async () => {
    const {statesTotalData} = this.props

    const totalConfirmed = statesTotalData.confirmed
    const totalRecovered = statesTotalData.recovered
    const totalDeceased = statesTotalData.deceased
    const totalActive = totalConfirmed - totalDeceased - totalRecovered

    const activeCases = {
      name: 'Active',
      logo:
        'https://res.cloudinary.com/dadmzulfj/image/upload/v1690016279/protection_1_mqu6mj.png',
      value: totalActive,
    }

    const recoveredCases = {
      name: 'Recovered',
      logo:
        'https://res.cloudinary.com/dadmzulfj/image/upload/v1690016535/recovered_1_byh3jq.png',
      value: totalRecovered,
    }

    const confirmedCases = {
      name: 'Confirmed',
      logo:
        'https://res.cloudinary.com/dadmzulfj/image/upload/v1690016092/check-mark_1_gd6srb.png',
      value: totalConfirmed,
    }

    const deceasedCases = {
      name: 'Deceased',
      logo:
        'https://res.cloudinary.com/dadmzulfj/image/upload/v1690016496/breathing_1_y2cysl.png',
      value: totalDeceased,
    }

    this.setState({
      activeCases,
      confirmedCases,
      deceasedCases,
      recoveredCases,
    })
  }

  onGetTotal = value => {
    const {onGetCategory} = this.props
    onGetCategory(value)
  }

  render() {
    const {
      activeCases,
      confirmedCases,
      deceasedCases,
      recoveredCases,
    } = this.state

    const {active} = this.props

    const onActive = active ? 'confirmed-block' : ''

    return (
      <ul className="state-total-list">
        <li
          className={`list-item ${confirmedCases.name} ${onActive}`}
          value={confirmedCases.name}
          key={confirmedCases.name}
          onClick={() => this.onGetTotal(confirmedCases.name)}
          tabIndex="-1"
        >
          <div testid="stateSpecificConfirmedCasesContainer">
            <p className="stats-title">{confirmedCases.name}</p>
            <img
              src={confirmedCases.logo}
              alt="state specific confirmed cases pic"
              className="stats-logo"
            />
            <p className="stats-number">{confirmedCases.value}</p>
          </div>
        </li>

        <li
          className={`list-item ${activeCases.name} `}
          value={activeCases.name}
          key={activeCases.name}
          onClick={() => this.onGetTotal(activeCases.name)}
          tabIndex="-1"
        >
          <div testid="stateSpecificConfirmedCasesContainer">
            <p className="stats-title">{activeCases.name}</p>
            <img
              src={activeCases.logo}
              alt="state specific confirmed cases pic"
              className="stats-logo"
            />
            <p className="stats-number">{activeCases.value}</p>
          </div>
        </li>

        <li
          className={`list-item ${recoveredCases.name} `}
          value={recoveredCases.name}
          key={recoveredCases.name}
          onClick={() => this.onGetTotal(recoveredCases.name)}
          tabIndex="-1"
        >
          <div testid="stateSpecificConfirmedCasesContainer">
            <p className="stats-title">{recoveredCases.name}</p>
            <img
              src={recoveredCases.logo}
              alt="state specific confirmed cases pic"
              className="stats-logo"
            />
            <p className="stats-number">{recoveredCases.value}</p>
          </div>
        </li>

        <li
          className={`list-item ${deceasedCases.name} `}
          value={deceasedCases.name}
          key={deceasedCases.name}
          onClick={() => this.onGetTotal(deceasedCases.name)}
          tabIndex="-1"
        >
          <div testid="stateSpecificConfirmedCasesContainer">
            <p className="stats-title">{deceasedCases.name}</p>
            <img
              src={deceasedCases.logo}
              alt="state specific confirmed cases pic"
              className="stats-logo"
            />
            <p className="stats-number">{deceasedCases.value}</p>
          </div>
        </li>
      </ul>
    )
  }
}

export default StatesTotal
