/* eslint-disable react/no-unknown-property */
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'
import TotalStats from '../TotalStats'
import SearchContainer from '../SearchContainer'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    totalActiveCases: 0,
    totalConfirmedCases: 0,
    totalRecoveredCases: 0,
    totalDeceasedCases: 0,
    searchInput: '',
    filteredSearchList: [],
    stateInfo: [],
  }

  componentDidMount() {
    this.getTotalDetails()
  }

  getTotalDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      let allTotalActive = 0
      let allTotalConfirm = 0
      let allTotalDeceased = 0
      let allTotalRecovered = 0

      statesList.forEach(state => {
        if (data[state.state_code]) {
          const {total} = data[state.state_code]
          allTotalConfirm += total.confirmed ? total.confirmed : 0
          allTotalDeceased += total.deceased ? total.deceased : 0
          allTotalRecovered += total.recovered ? total.recovered : 0
        }
      })
      allTotalActive = allTotalConfirm - (allTotalRecovered + allTotalDeceased)

      const states = statesList.map(each => ({
        stateName: each.state_name,
        stateCode: each.state_code,
        confirmed: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.confirmed),
        other: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.other),
        deceased: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.deceased),
        recovered: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.recovered),
        population: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].meta.population),
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        totalActiveCases: allTotalActive,
        totalConfirmedCases: allTotalConfirm,
        totalRecoveredCases: allTotalRecovered,
        totalDeceasedCases: allTotalDeceased,
        stateInfo: states,
      })
    }
  }

  renderCumulativeCards = () => {
    const {
      totalActiveCases,
      totalConfirmedCases,
      totalRecoveredCases,
      totalDeceasedCases,
    } = this.state

    return (
      <div className="cumulative-cards-container">
        <div className="cumulative-card" testid="countryWideConfirmedCases">
          <p className="cumulative-name confirm-color">Confirmed</p>
          <img
            src="https://res.cloudinary.com/dadmzulfj/image/upload/v1690016092/check-mark_1_gd6srb.png"
            alt="country wide confirmed cases pic"
            className="cumulative-img"
          />
          <p className="cumulative-number confirm-color">
            {totalConfirmedCases}
          </p>
        </div>

        <div className="cumulative-card" testid="countryWideActiveCases">
          <p className="cumulative-name active-color">Active</p>
          <img
            src="https://res.cloudinary.com/dadmzulfj/image/upload/v1690016279/protection_1_mqu6mj.png"
            alt="country wide active cases pic"
            className="cumulative-img"
          />
          <p className="cumulative-number active-color">{totalActiveCases}</p>
        </div>

        <div className="cumulative-card" testid="countryWideRecoveredCases">
          <p className="cumulative-name recovered-color">Recovered</p>
          <img
            src="https://res.cloudinary.com/dadmzulfj/image/upload/v1690016535/recovered_1_byh3jq.png"
            alt="country wide recovered cases pic"
            className="cumulative-img"
          />
          <p className="cumulative-number recovered-color">
            {totalRecoveredCases}
          </p>
        </div>

        <div className="cumulative-card" testid="countryWideDeceasedCases">
          <p className="cumulative-name deceased-color">Deceased</p>
          <img
            src="https://res.cloudinary.com/dadmzulfj/image/upload/v1690016496/breathing_1_y2cysl.png"
            alt="country wide deceased cases pic"
            className="cumulative-img"
          />
          <p className="cumulative-number deceased-color">
            {totalDeceasedCases}
          </p>
        </div>
      </div>
    )
  }

  onClickASCBtn = () => {
    const {stateInfo} = this.state
    const sortedList = stateInfo.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x > y ? 1 : -1
    })
    this.setState({stateInfo: sortedList})
  }

  onClickDESCBtn = () => {
    const {stateInfo} = this.state
    const sortedList = stateInfo.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x < y ? 1 : -1
    })
    this.setState({stateInfo: sortedList})
  }

  onChangeSearch = event => {
    const searchItem = event.target.value
    const filteredList = statesList.filter(each =>
      each.state_name.toLowerCase().includes(searchItem.toLowerCase()),
    )
    this.setState({
      searchInput: event.target.value,
      filteredSearchList: filteredList,
    })
  }

  showFilteredList = () => {
    const {filteredSearchList} = this.state
    return (
      <ul
        className="search-result-container"
        testid="searchResultsUnorderedList"
      >
        {filteredSearchList.map(each => (
          <SearchContainer
            key={each.state_code}
            stateName={each.state_name}
            stateCode={each.state_code}
            id={each.state_code}
          />
        ))}
      </ul>
    )
  }

  renderAllStatesList = () => {
    const {stateInfo} = this.state

    return (
      <div className="all-sates-table" testid="stateWiseCovidDataTable">
        <ul className="table-header">
          <div className="state-name-heading">
            <p className="table-header-title">States/UT</p>
            <button
              type="button"
              className="sort-btn"
              onClick={this.onClickASCBtn}
              testid="ascendingSort"
            >
              <FcGenericSortingAsc className="order" />
            </button>
            <button
              type="button"
              className="sort-btn"
              onClick={this.onClickDESCBtn}
              testid="descendingSort"
            >
              <FcGenericSortingDesc className="order" />
            </button>
          </div>
          <div testid="countryWideConfirmedCases" className="other-tables-bar">
            <p className="table-header-title">Confirmed</p>
          </div>
          <div testid="countryWideActiveCases" className="other-tables-bar">
            <p className="table-header-title">Active</p>
          </div>
          <div testid="countryWideRecoveredCases" className="other-tables-bar">
            <p className="table-header-title">Recovered</p>
          </div>
          <div testid="countryWideDeceasedCases" className="other-tables-bar">
            <p className="table-header-title">Deceased</p>
          </div>
          <div className="other-tables-bar">
            <p className="table-header-title">Population</p>
          </div>
        </ul>
        <div className="state-wise-data-container">
          {stateInfo.map(each => (
            <ul className="states-list-container" key={each.stateName}>
              <TotalStats data={each} key={each.state_code} />
            </ul>
          ))}
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="homeRouteLoader">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => (
    <>
      {this.renderCumulativeCards()}
      {this.renderAllStatesList()}
    </>
  )

  onAbortSearch = () => {
    this.setState({filteredSearchList: []})
  }

  renderResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    const showSearchList =
      searchInput.length === 0 ? null : this.showFilteredList()
    return (
      <>
        <Header />
        <div className="Home-container">
          <div className="searchResultsListContainer">
            <div className="input-container">
              <div className="icon-search-container">
                <BsSearch className="search-icon" size={15} />
                <input
                  value={searchInput}
                  className="input-cell"
                  placeholder="Enter the State"
                  onChange={this.onChangeSearch}
                  onAbort={this.onAbortSearch}
                  type="search"
                />
              </div>
            </div>
            {searchInput.length > 0 ? showSearchList : ''}
          </div>
          {this.renderResult()}
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
