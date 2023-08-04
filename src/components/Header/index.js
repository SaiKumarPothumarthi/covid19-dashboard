import {Component} from 'react'
import {Link} from 'react-router-dom'

import {AiFillCloseCircle, AiOutlineMenuFold} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {
    isShowList: false,
    isHomeActive: false,
    isAboutActive: false,
    isVacciActive: false,
  }

  onClickQueue = () => {
    this.setState(prevState => ({isShowList: !prevState.isShowList}))
  }

  onClose = () => {
    this.setState({isShowList: false})
  }

  onClickHome = () => {
    this.setState({
      isHomeActive: true,
      isAboutActive: false,
      isVacciActive: false,
    })
  }

  onClickAbout = () => {
    this.setState({
      isHomeActive: false,
      isAboutActive: true,
      isVacciActive: false,
    })
  }

  onClickVaccination = () => {
    this.setState({
      isHomeActive: false,
      isAboutActive: false,
      isVacciActive: true,
    })
  }

  render() {
    const {isShowList, isAboutActive, isHomeActive, isVacciActive} = this.state

    const homeBtnClass = isHomeActive ? 'highlightedOne' : 'Normal'
    const aboutBtnClass = isAboutActive ? 'highlightedOne' : 'Normal'
    const vacciBtnClass = isVacciActive ? 'highlightedOne' : 'Normal'

    return (
      <>
        <nav className="header-container">
          <Link to="/" className="nav-link">
            <h1 className="header-logo-heading">
              COVID19<span className="header-span">INDIA</span>
            </h1>
          </Link>
          <div className="mobile-header-icon-container">
            <button
              type="button"
              className="queue-btn"
              onClick={this.onClickQueue}
            >
              <AiOutlineMenuFold
                color="#ffffff"
                size={25}
                className="mobile-menu-icon"
              />
            </button>
          </div>
          <ul className="header-option-container">
            <Link to="/" className="nav-link">
              <li key="1">
                <button
                  type="button"
                  className={homeBtnClass}
                  onClick={this.onClickHome}
                >
                  Home
                </button>
              </li>
            </Link>

            <Link to="/vaccination" className="nav-link">
              <li key="6">
                <button
                  type="button"
                  className={vacciBtnClass}
                  onClick={this.onClickVaccination}
                >
                  Vaccination
                </button>
              </li>
            </Link>
            <Link to="/about" className="nav-link">
              <li key="2">
                <button
                  type="button"
                  className={aboutBtnClass}
                  onClick={this.onClickAbout}
                >
                  About
                </button>
              </li>
            </Link>
          </ul>
        </nav>
        {isShowList ? (
          <ul className="mobile-popup-container">
            <div className="option-container-popup">
              <Link to="/" className="nav-link">
                <li key="3" className={homeBtnClass}>
                  Home
                </li>
              </Link>

              <Link to="/vaccination" className="nav-link">
                <li key="6">
                  <button type="button" className={vacciBtnClass}>
                    Vaccination
                  </button>
                </li>
              </Link>
              <Link to="/about" className="nav-link">
                <li key="4">
                  <button type="button" className={aboutBtnClass}>
                    About
                  </button>
                </li>
              </Link>
            </div>
            <button
              type="button"
              className="header-close-button"
              onClick={this.onClose}
            >
              <AiFillCloseCircle color="#ffffff" size={25} />
            </button>
          </ul>
        ) : null}
      </>
    )
  }
}

export default Header
