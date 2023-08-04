import './index.css'

const FaqItemList = props => {
  const {details} = props
  const {question, answer, qno} = details
  return (
    <li key={qno} className="faq-item">
      <p className="faq-question">{question}</p>
      <p className="faq-answer">{answer}</p>
    </li>
  )
}

export default FaqItemList
