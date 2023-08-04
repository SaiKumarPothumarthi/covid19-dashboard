/* eslint-disable react/no-unknown-property */
import {Component} from 'react'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'

import Loader from 'react-loader-spinner'
import {GiLoveInjection} from 'react-icons/gi'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  initial: 'INITIAL',
  failure: 'Fail',
}

class Vaccination extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    vaccinationData: [],
    allVaccinationStateData: [],
    statesList: [],
    districtsList: [],
    selectedState: '',
    selectedDistrict: '',
    selectedStateId: null,
    selectedStateData: '',
  }

  componentDidMount() {
    this.getStateDetails()
    this.getVaccinationDetails()
  }

  handleStateChange = event => {
    const {statesList, allVaccinationStateData} = this.state
    const selectedStateName = event.target.value
    const selectedState = statesList.find(
      state => state.stateName === selectedStateName,
    )
    const selectedStateId = selectedState ? selectedState.stateId : null

    const selectedStateData = allVaccinationStateData.find(
      each => each.stateName === selectedStateName,
    )

    this.setState(
      {
        selectedState: selectedStateName,
        selectedDistrict: '',
        selectedStateId,
        selectedStateData,
      },
      () => {
        this.getDistrictDetails()
      },
    )
  }

  handleDistrictChange = event => {
    this.setState({selectedDistrict: event.target.value})
  }

  getStateDetails = async () => {
    const stateApiUrl = 'https://apis.ccbp.in/covid19-state-ids'
    const options = {
      method: 'GET',
    }
    const response = await fetch(stateApiUrl, options)

    const statesData = await response.json()

    const updatedData = statesData.states.map(eachState => ({
      stateName: eachState.state_name,
      stateId: eachState.state_id,
    }))

    this.setState({statesList: updatedData})
  }

  getDistrictDetails = async () => {
    const {selectedStateId} = this.state
    const districtUrl = `https://apis.ccbp.in/covid19-districts-data/${selectedStateId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(districtUrl, options)
    const districtsData = await response.json()
    const updatedDistrictData = districtsData.districts.map(eachDistrict => ({
      districtId: eachDistrict.district_id,
      districtName: eachDistrict.district_name,
    }))

    this.setState({districtsList: updatedDistrictData})
  }

  getVaccinationDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const vaccinationUrl = 'https://apis.ccbp.in/covid19-vaccination-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(vaccinationUrl, options)
    if (response.ok) {
      const data = await response.json()
      const TotalSessionSiteData = data.sessionSiteData
      const TotalVaccinationData = data.topBlock.vaccination
      const vaccinationByGenderDetails = data.topBlock.vaccination
      const vaccinationTimings = data.vaccinationDoneByTime.map(each => ({
        count: each.count,
        dose_one: each.dose_one,
        dose_one_1: each.dose_one_1,
        dose_pd: each.dose_pd,
        dose_two: each.dose_two,
        label: each.label,
        timestamps: each.timestamps,
        ts: each.ts,
      }))
      const vaccinationByAgeDetails = data.vaccinationByAge
      const vaccinationStateDetails = data.getBeneficiariesGroupBy.map(
        each => ({
          total: each.total,
          partiallyVaccinated: each.partial_vaccinated,
          totallyVaccinated: each.totally_vaccinated,
          stateId: each.state_id,
          stateName: each.state_name,
        }),
      )

      this.setState({
        vaccinationData: {
          TotalSessionSiteData,
          TotalVaccinationData,
          vaccinationByGenderDetails,
          vaccinationByAgeDetails,
          vaccinationTimings,
        },
        apiStatus: apiStatusConstants.success,
        allVaccinationStateData: vaccinationStateDetails,
      })
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="timelinesDataLoader">
      <Loader type="TailSpin" color="blue" height="50" width="50" />
    </div>
  )

  renderFailure = () => <p>Fetch Error</p>

  renderLineCharts = () => {
    const {vaccinationData} = this.state
    const {vaccinationTimings} = vaccinationData
    return (
      <>
        <div className="mobile-line-chart">
          <AreaChart width={500} height={300} data={vaccinationTimings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="dose_one"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="dose_two"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="dose_pd"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </div>

        <div className="large-line-chart">
          <AreaChart width={1200} height={600} data={vaccinationTimings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="dose_one"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="dose_two"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="dose_pd"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </div>
      </>
    )
  }

  renderFullPieChart = () => {
    const {vaccinationData} = this.state
    const {vaccinationByAgeDetails} = vaccinationData
    if (!vaccinationByAgeDetails) {
      return null
    }
    const chartData = [
      {name: '12-14', value: vaccinationByAgeDetails.vac_12_14},
      {name: '15-17', value: vaccinationByAgeDetails.vac_15_17},
      {name: '18-45', value: vaccinationByAgeDetails.vac_18_45},
      {name: '45-60', value: vaccinationByAgeDetails.vac_45_60},
      {name: 'Above 60', value: vaccinationByAgeDetails.above_60},
    ]

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

    return (
      <>
        <div className="mobile-full-pie">
          <PieChart width={200} height={300}>
            <Pie
              data={chartData}
              dataKey="value"
              cx="50%"
              cy="30%"
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={2}
            >
              {chartData.map(entry => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={COLORS[chartData.indexOf(entry) % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </div>
        <div className="large-full-pie">
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={2}
            >
              {chartData.map(entry => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={COLORS[chartData.indexOf(entry) % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </div>
      </>
    )
  }

  renderHalfRadialCharts = () => {
    const {vaccinationData} = this.state
    const {TotalVaccinationData, vaccinationByGenderDetails} = vaccinationData
    const {male, female, others} = vaccinationByGenderDetails
    const {covishield, covaxin, sputnik} = TotalVaccinationData
    if (!vaccinationByGenderDetails) {
      return null
    }

    const chartData = [
      {name: 'Male', value: male, fill: '#0088FE'},
      {name: 'Female', value: female, fill: '#00C49F'},
      {name: 'Others', value: others, fill: '#FFBB28'},
    ]

    const chartBrandData = [
      {name: 'Covishield', value: covishield, fill: '#0088FE'},
      {name: 'Covaxin', value: covaxin, fill: '#00C49F'},
      {name: 'Sputnik', value: sputnik, fill: '#FFBB28'},
    ]

    return (
      <>
        <div className="mobile-half-pie">
          <div className="half-pie-container">
            <PieChart width={200} height={200}>
              <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={3}
              >
                {chartData.map(entry => (
                  <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>

            <PieChart width={200} height={300}>
              <Pie
                data={chartBrandData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={1}
              >
                {chartBrandData.map(entry => (
                  <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </div>
        </div>

        <div className="large-half-pie">
          <div className="half-pie-container">
            <PieChart width={300} height={200}>
              <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="80%"
                startAngle={180}
                endAngle={0}
                innerRadius={80}
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={3}
              >
                {chartData.map(entry => (
                  <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>

            <PieChart width={300} height={300}>
              <Pie
                data={chartBrandData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={1}
              >
                {chartBrandData.map(entry => (
                  <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </div>
        </div>
      </>
    )
  }

  renderSuccessView = () => {
    const {
      districtsList,
      statesList,
      vaccinationData,
      selectedState,
      selectedDistrict,
      selectedStateData,
    } = this.state
    const {TotalSessionSiteData} = vaccinationData

    return (
      <div className="vaccination-container">
        <div className="vaccination-heading-container">
          <GiLoveInjection className="icon" />
          <h1 className="vaccination-heading">Vaccination</h1>
        </div>

        <div className="drop-down-container">
          <select
            id="state"
            value={selectedState}
            onChange={this.handleStateChange}
            className="select"
          >
            <option key="1" value="" className="option">
              Select State
            </option>
            {statesList.map(state => (
              <option
                key={state.stateId}
                value={state.stateName}
                className="option"
              >
                {state.stateName}
              </option>
            ))}
          </select>

          <>
            <select
              id="district"
              value={selectedDistrict}
              onChange={this.handleDistrictChange}
              className="select"
            >
              <option key="2" value="" className="option">
                Select District
              </option>
              {districtsList.map(district => (
                <option
                  key={district.districtId}
                  value={district.districtName}
                  className="option"
                >
                  {district.districtName}
                </option>
              ))}
            </select>
          </>
        </div>
        <div className="top-cards-container">
          <div className="card-container">
            <img
              src="https://res.cloudinary.com/dadmzulfj/image/upload/v1690994341/Group_7476_scey2s.png"
              className="card-img"
              alt="card-logo"
            />
            <div className="site-data-container">
              <div className="total-site-data">
                <p className="total-heading">Site Conducting Vaccination</p>
                <p className="total-site-num">
                  {TotalSessionSiteData.total_sites}
                </p>
              </div>
              <div className="site-data">
                <div className="site-data-details">
                  <p className="site-data-head">Government</p>
                  <p className="site-data-num">
                    {TotalSessionSiteData.govt_sites}
                  </p>
                </div>
                <div className="site-data-details">
                  <p className="site-data-head">Private</p>
                  <p className="site-data-num">
                    {TotalSessionSiteData.pvt_sites}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-container">
            <img
              src="https://res.cloudinary.com/dadmzulfj/image/upload/v1690994341/Group_7475_clwj1d.png"
              className="card-img"
              alt="card-logo"
            />
            <div className="site-data-container">
              <div className="total-site-data">
                <p className="total-heading">Total Vaccination Doses </p>
                {selectedStateData ? (
                  <p className="total-site-num">{selectedStateData.total}</p>
                ) : (
                  <p className="hyphen"> - - Please Select State - - </p>
                )}
              </div>
              <div className="site-data">
                <div className="site-data-details">
                  <p className="site-data-head">Dose 1</p>
                  {selectedStateData ? (
                    <p className="site-data-num">
                      {selectedStateData.partiallyVaccinated}
                    </p>
                  ) : (
                    <p className="hyphen"> - - </p>
                  )}
                </div>
                <div className="site-data-details">
                  <p className="site-data-head">Dose 2</p>
                  {selectedStateData ? (
                    <p className="site-data-num">
                      {selectedStateData.totallyVaccinated}
                    </p>
                  ) : (
                    <p className="hyphen"> - - </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="line-chart-container">
          <h1 className="vaccination-trends-heading">Vaccination Trends</h1>
          <div className="line-chart-container">{this.renderLineCharts()}</div>
        </div>
        <div className="pie-containers">
          {this.renderHalfRadialCharts()}
          {this.renderFullPieChart()}
        </div>
      </div>
    )
  }

  renderResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderResult()}
        <Footer />
      </>
    )
  }
}

export default Vaccination
