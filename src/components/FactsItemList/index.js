import './index.css'

const FactsItemList = props => {
  const {details} = props
  const {id, banner} = details
  return (
    <li key={id} className="faq-item">
      <p className="fact-question">{banner}</p>
    </li>
  )
}

export default FactsItemList
