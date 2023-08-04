import './index.css'

const DistrictWise = props => {
  const {number, name} = props

  return (
    <li className="district-list-item">
      <p className="district-number">{number}</p>
      <p className="district-name">{name}</p>
    </li>
  )
}

export default DistrictWise
