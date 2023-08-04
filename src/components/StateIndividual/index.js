/* eslint-disable react/no-unknown-property */
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

import ChartsData from '../ChartsData'
import DistrictWise from '../DistrictWise'
import StatesTotal from '../StatesTotal'

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

const statesMapsList = [
  {
    state_code: 'AN',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523121/Group_7326_h1ukkm.png',
  },
  {
    state_code: 'AP',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523641/Group_7354_syjzn8.png',
  },
  {
    state_code: 'AR',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523123/Group_7340_eetwq6.png',
  },
  {
    state_code: 'AS',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523123/Group_7341_r1bq26.png',
  },
  {
    state_code: 'BR',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523124/Group_7335_gpdldr.png',
  },
  {
    state_code: 'CH',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523121/Group_7361_sbusmh.png',
  },
  {
    state_code: 'CT',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523122/Group_7353_ahopau.png',
  },
  {
    state_code: 'DN',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523121/Group_7357_z4hkxi.png',
  },
  {
    state_code: 'DL',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523121/Group_7358_xzygok.png',
  },
  {
    state_code: 'GA',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523123/Group_7349_dcgokv.png',
  },
  {
    state_code: 'GJ',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523124/Group_7337_rh2d4c.png',
  },
  {
    state_code: 'HR',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523124/Group_7332_qhefg6.png',
  },
  {
    state_code: 'HP',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523125/Group_7364_kin9u6.png',
  },
  {
    state_code: 'JK',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523125/Group_7328_amffeb.png',
  },
  {
    state_code: 'JH',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523123/Group_7342_cqgwvy.png',
  },
  {
    state_code: 'KA',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523121/Group_7339_i7v1lb.png',
  },
  {
    state_code: 'KL',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523121/Group_7355_ysmyao.png',
  },
  {
    state_code: 'LA',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523121/Group_7363_g7g7yk.png',
  },
  {
    state_code: 'LD',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523121/Group_7359_atr7lt.png',
  },
  {
    state_code: 'MH',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523122/Group_7350_fj3vha.png',
  },
  {
    state_code: 'MP',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523124/Group_7336_psobfo.png',
  },
  {
    state_code: 'MN',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523123/Group_7346_nd3v5e.png',
  },
  {
    state_code: 'ML',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523123/Group_7344_n0zq6q.png',
  },
  {
    state_code: 'MZ',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523122/Group_7347_zh0y4s.png',
  },
  {
    state_code: 'NL',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523123/Group_7345_js7pkf.png',
  },
  {
    state_code: 'OR',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523122/Group_7348_r8fgxt.png',
  },
  {
    state_code: 'PY',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523121/Group_7360_el6oqh.png',
  },
  {
    state_code: 'PB',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523125/Group_7330_zxmkpw.png',
  },
  {
    state_code: 'RJ',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523124/Group_7333_khiysz.png',
  },
  {
    state_code: 'SK',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523124/Group_7338_u9l4au.png',
  },
  {
    state_code: 'TN',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523121/Group_7356_cemjmo.png',
  },
  {
    state_code: 'TG',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523122/Group_7351_nabswi.png',
  },
  {
    state_code: 'TR',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523122/Group_7352_yt4aqr.png',
  },
  {
    state_code: 'UP',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523124/Group_7334_ojn3ej.png',
  },
  {
    state_code: 'UT',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523124/Group_7331_vvg7pj.png',
  },
  {
    state_code: 'WB',
    state_map_url:
      'https://res.cloudinary.com/dadmzulfj/image/upload/v1690523123/Group_7343_lvp9jb.png',
  },
]

const apiStatusConstants = {
  initial: 'INITIAl',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'Failure',
}

class StateIndividual extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    activeTab: true,
    category: 'Confirmed',
    dataArray: [],
    statesTotalData: [],
    stateName: '',
    stateId: '',
    stateCode: '',
    totalTestedData: 0,
    date: '',
    mapDetails: [],
  }

  componentDidMount = () => {
    this.getStateData()
  }

  getStateData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const stateTestedData = data[stateCode].total.tested
      const stateObject = statesList.filter(
        each => each.state_code === stateCode,
      )
      const eachState = data[stateCode].total
      const stateName = stateObject[0].state_name
      const date = new Date(data[stateCode].meta.last_updated)
      const totalPopulation = data[stateCode].meta.population
      const asOfDate = new Date(data[stateCode].meta.tested.date)
      const totalTests = data[stateCode].total.tested
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      const day = date.getDate()
      const month = date.getMonth()
      const year = date.getFullYear()
      const formattedDate = `${months[month]} ${day}, ${year}`
      const reportDay = asOfDate.getDate()
      const reportMonth = asOfDate.getMonth()
      const formatAsOfDate = `${reportDay} ${months[reportMonth]}`
      const mapDetails = {
        totalPopulation,
        formatAsOfDate,
        totalTests,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        dataArray: data,
        statesTotalData: eachState,
        stateName,
        stateId: stateCode,
        stateCode,
        totalTestedData: stateTestedData,
        date: formattedDate,
        mapDetails,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onGetCategory = categoryVal => {
    this.setState({category: categoryVal, activeTab: false})
  }

  onGetCategoryWiseData = () => {
    const {stateId, category, dataArray} = this.state
    const districtOutput = dataArray[stateId].districts
    const districtNamesList = Object.keys(districtOutput)
    const lowerCategory = category.toLowerCase()

    const categoryData = districtNamesList.map(each => ({
      districtName: each,
      value: districtOutput[each].total[lowerCategory]
        ? districtOutput[each].total[lowerCategory]
        : 0,
    }))
    categoryData.sort((a, b) => b.value - a.value)

    const activeCases = districtNamesList.map(each => ({
      districtName: each,
      value:
        districtOutput[each].total.confirmed -
        (districtOutput[each].total.deceased +
          districtOutput[each].total.recovered)
          ? districtOutput[each].total.confirmed -
            (districtOutput[each].total.deceased +
              districtOutput[each].total.recovered)
          : 0,
    }))

    activeCases.sort((a, b) => b.value - a.value)
    if (lowerCategory === 'active') {
      return activeCases
    }
    return categoryData
  }

  renderSuccessView = () => {
    const {
      activeTab,
      totalTestedData,
      statesTotalData,
      stateName,
      date,
      category,
      stateCode,
      mapDetails,
    } = this.state
    const categoryData = this.onGetCategoryWiseData()

    const filteredMapDetails = statesMapsList.filter(
      eachMap => eachMap.state_code === stateCode,
    )

    return (
      <>
        <div className="stateName-tests-count">
          <h1 className="stateName-heading">{stateName}</h1>
          <div className="tests-container">
            <p className="test-title">Tested</p>
            <p className="tests-no">{totalTestedData}</p>
          </div>
        </div>
        <div>
          <p className="last-time">{`last updated on ${date}`}.</p>
        </div>
        <div className="total-states-data-container">
          <div className="country-stats">
            <StatesTotal
              onGetCategory={this.onGetCategory}
              statesTotalData={statesTotalData}
              active={activeTab}
            />
          </div>
        </div>
        <div className="map-container">
          {filteredMapDetails.map(each => (
            <img
              src={each.state_map_url}
              className="map-img"
              alt={stateName}
              key={each.state_code}
            />
          ))}

          <div className="ncp-main">
            <h1 className="ncp-heading">NCP Report</h1>
            <div className="ncp-report-container">
              <div>
                <p className="ncp-population">Population</p>
                <p className="ncp-population-number">
                  {mapDetails.totalPopulation}
                </p>
              </div>
              <div>
                <p className="ncp-tested">Tested</p>
                <p className="ncp-tested-number">{mapDetails.totalTests}</p>
                <p className="as-of-date">
                  (As of {mapDetails.formatAsOfDate} per source)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="top-districts-data-container"
          testid="lineChartsContainer"
        >
          <h1 className={`district-heading ${category}-color`}>
            Top Districts
          </h1>
          <div className="ul-parent-list">
            <div className="district-data-ul-list">
              <ul
                className="districts-container"
                testid="topDistrictsUnorderedList"
              >
                {categoryData.map(each => (
                  <DistrictWise
                    key={each.districtName}
                    number={each.value}
                    name={each.districtName}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="charts-container">
          <ChartsData districtsChart={category} districtCode={stateCode} />
        </div>
      </>
    )
  }

  renderFailureView = () => <p>Fetch Error</p>

  renderLoader = () => (
    <div className="loader-container" testid="stateDetailsLoader">
      <Loader type="TailSpin" color="blue" height="50" width="50" />
    </div>
  )

  renderResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <Header />
        <div className="state-details-main-container">
          {this.renderResult()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default StateIndividual
