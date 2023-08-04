import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-main-container">
      <h1 className="footer-logo-heading">
        COVID19<span className="footer-span">INDIA</span>
      </h1>
      <p className="footer-para">
        we stand with everyone fighting on the front lines
      </p>
      <div className="footer-icon-container">
        <div className="icon-container">
          <VscGithubAlt size={35} color="#CBD5E1" />
        </div>
        <div className="icon-container">
          <FiInstagram size={35} color="#CBD5E1" />
        </div>
        <div className="icon-container">
          <FaTwitter size={35} color="#CBD5E1" />
        </div>
      </div>
    </div>
  </div>
)

export default Footer
