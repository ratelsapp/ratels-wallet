import { useHistory } from 'react-router-dom'
import SvgBack from 'components/svgs/SvgBack'
import './index.css'
export default function IncreaseHeader(props) {
  const history = useHistory()
  const { title, right } = props
  const handleBack = () => {
    history.goBack()
  }
  return (
    <div className="header-wrapper">
      <div className="content">
        <div className="back" onClick={() => handleBack()}>
          <SvgBack />
        </div>
        <div className="title">
          <p>{title}</p>
        </div>
        <div className="right">
          {
            right ? <p>{right}</p> : ''
          }
        </div>
      </div>
    </div>
  )
}