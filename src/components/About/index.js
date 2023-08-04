/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import FaqItemList from '../FaqItemList'
import FactsItemList from '../FactsItemList'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

class About extends Component {
  state = {aboutData: [], apiStatus: apiStatusConstants.initial, factsList: []}

  componentDidMount = () => {
    this.getAboutDetails()
  }

  getAboutDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(apiUrl)
    const data = await response.json()
    const updatedData = data.faq.map(each => ({
      answer: each.answer,
      category: each.category,
      qno: each.qno,
      question: each.question,
    }))
    const updatedFactsList = data.factoids.map(each => ({
      banner: each.banner,
      id: each.id,
    }))
    this.setState({
      apiStatus: apiStatusConstants.success,
      aboutData: updatedData,
      factsList: updatedFactsList,
    })
  }

  renderLoader = () => (
    <div className="loader-container" testid="aboutRouteLoader">
      <Loader type="ThreeDots" color="#007BFF" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {aboutData, factsList} = this.state
    return (
      <>
        <ul className="about-list-container" testid="faqsUnorderedList">
          {aboutData.map(each => (
            <FaqItemList key={each.qno} details={each} />
          ))}
        </ul>
        <div className="facts-List-container">
          <h1 className="facts-heading">Facts</h1>
          <ul className="about-list-container">
            {factsList.map(eachFact => (
              <FactsItemList details={eachFact} key={eachFact.id} />
            ))}
          </ul>
        </div>
      </>
    )
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
    return (
      <div className="about-whole">
        <Header />
        <div className="about-container">
          <h1 className="about-heading">About</h1>
          <p className="last-updated-para">Last update on march 28th 2021.</p>
          <p className="info-para">
            COVID-19 vaccines be ready for distribution
          </p>
          {this.renderResult()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default About
