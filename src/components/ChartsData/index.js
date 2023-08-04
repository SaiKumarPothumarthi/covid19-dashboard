/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {
  BarChart,
  Bar,
  Tooltip,
  Legend,
  XAxis,
  LineChart,
  Line,
  YAxis,
} from 'recharts'
import Loader from 'react-loader-spinner'
import './index.css'

class Charts extends Component {
  state = {
    chartsList: '',
    chartsOther: '',
    isLoading: true,
  }

  componentDidMount() {
    this.chartsData()
  }

  chartsData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-timelines-data/'
    const options = {
      method: 'GET',
    }
    const {districtCode} = this.props
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const dataObject = Object.keys(data[districtCode].dates)
      const dataState = dataObject.map(eachDate => ({
        eachDate,
        confirmed: data[districtCode].dates[eachDate].total.confirmed,
        recovered: data[districtCode].dates[eachDate].total.recovered,
        deceased: data[districtCode].dates[eachDate].total.deceased,
        tested: data[districtCode].dates[eachDate].total.tested,
        active:
          data[districtCode].dates[eachDate].total.confirmed -
          (data[districtCode].dates[eachDate].total.deceased +
            data[districtCode].dates[eachDate].total.recovered),
      }))

      const dataCharts = dataObject.map(eachDate => ({
        eachDate,
        confirmed: data[districtCode].dates[eachDate].total.confirmed,
        recovered: data[districtCode].dates[eachDate].total.recovered,
        deceased: data[districtCode].dates[eachDate].total.deceased,
        tested: data[districtCode].dates[eachDate].total.tested,
        active:
          data[districtCode].dates[eachDate].total.confirmed -
          (data[districtCode].dates[eachDate].total.deceased +
            data[districtCode].dates[eachDate].total.recovered),
      }))

      this.setState({
        chartsList: dataState,
        chartsOther: dataCharts,
        isLoading: false,
      })
    }
  }

  graphList = (caseList, color) => {
    const {chartsOther} = this.state
    const formatYAxisTicks = value => {
      if (value > 1000) return `${Math.round(value / 1000)}k`
      return value
    }
    return (
      <>
        <div className="line-charts">
          <LineChart
            width={900}
            height={350}
            data={chartsOther}
            margin={{top: 5, right: 50, left: 20, bottom: 15}}
          >
            <XAxis
              dataKey="eachDate"
              style={{
                fontFamily: 'Roboto',
                fontWeight: 500,
                textTransform: 'uppercase',
              }}
              tick={{fontSize: 10, fill: color}}
              dy={5}
            />
            <YAxis
              tickFormatter={formatYAxisTicks}
              tick={{fontSize: 10, fill: color}}
            />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={caseList} stroke={color} />
          </LineChart>
        </div>

        <div className="mobile-line-charts">
          <LineChart
            width={400}
            height={250}
            data={chartsOther}
            margin={{top: 5, right: 50, left: 20, bottom: 5}}
          >
            <XAxis
              dataKey="eachDate"
              style={{
                fontFamily: 'Roboto',
                fontWeight: 500,
                textTransform: 'uppercase',
              }}
              tick={{fontSize: 5, fill: color}}
              dy={5}
            />
            <YAxis
              tickFormatter={formatYAxisTicks}
              tick={{fontSize: 5, fill: color}}
            />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={caseList} stroke={color} />
          </LineChart>
        </div>
      </>
    )
  }

  graphCharts = () => (
    <div>
      <h1 className="Charts-graph-heading">Spread Trends</h1>
      <div testid="lineChartsContainer" className="lineChart-graph">
        <div className="charts-graph-list-margin charts-graph-red">
          {this.graphList('confirmed', '#FF073A')}
        </div>
        <div className="charts-graph-list-margin charts-graph-blue">
          {this.graphList('active', '#007BFF')}
        </div>
        <div className="charts-graph-list-margin charts-graph-green">
          {this.graphList('recovered', '#27A243')}
        </div>
        <div className="charts-graph-list-margin charts-graph-gray">
          {this.graphList('deceased', '#6C757D')}
        </div>
        <div className="charts-graph-list-margin charts-graph-vi">
          {this.graphList('tested', '#9673B9')}
        </div>
      </div>
    </div>
  )

  render() {
    const {chartsList, isLoading} = this.state

    const {districtsChart} = this.props
    const barChart = districtsChart.toLowerCase()
    const maxBarChart = chartsList.slice(Math.max(chartsList.length - 10, 0))

    let barColor = '#9A0E31'
    if (barChart === 'confirmed') {
      barColor = '#9A0E31'
    } else if (barChart === 'active') {
      barColor = '#0A4FA0'
    } else if (barChart === 'recovered') {
      barColor = '#216837'
    } else if (barChart === 'deceased') {
      barColor = '#474C57'
    }

    return (
      <>
        {isLoading ? (
          <div className="loading-class" testid="timelinesDataLoader">
            <Loader type="Oval" color="#007BFF" height={50} width={50} />
          </div>
        ) : (
          <div className="Charts-container">
            <div className="Charts-BarChart">
              <BarChart
                width={900}
                height={400}
                barSize={45}
                data={maxBarChart}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis
                  dataKey="eachDate"
                  stroke={barColor}
                  interval={0}
                  axisLine={false}
                  fontSize={12}
                  tickLine={0}
                  strokeWidth={1}
                  style={{
                    fontFamily: 'Roboto',
                    fontWeight: 500,
                    textTransform: 'upperCase',
                  }}
                  dy={10}
                />

                <Tooltip />
                <Legend />
                <Bar
                  dataKey={barChart}
                  fill={barColor}
                  label={{position: 'top', fill: `${barColor}`, fontSize: 10}}
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </div>
            <div className="mobile-Charts-BarChart">
              <BarChart
                width={400}
                height={200}
                barSize={20}
                data={maxBarChart}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis
                  dataKey="eachDate"
                  stroke={barColor}
                  interval={0}
                  axisLine={false}
                  fontSize={6}
                  tickLine={0}
                  strokeWidth={1}
                  style={{
                    fontFamily: 'Roboto',
                    fontWeight: 500,
                    textTransform: 'upperCase',
                  }}
                  dy={10}
                />

                <Tooltip />
                <Legend />
                <Bar
                  dataKey={barChart}
                  fill={barColor}
                  label={{position: 'top', fill: `${barColor}`, fontSize: 8}}
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </div>
            <div className="Charts-bargraph">{this.graphCharts()}</div>
          </div>
        )}
      </>
    )
  }
}

export default Charts
