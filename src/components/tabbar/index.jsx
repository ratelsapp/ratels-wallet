
import { Link, useHistory } from 'react-router-dom'
import HomeSvg from './HomeSvg'
import HomeSvged from './HomeSvged'
import SwapSvg from './SwapSvg'
import SwapSvged from './SwapSvged'
import RecordSvg from './RecordSvg'
import RecordSvged from './RecordSvged'
import SetSvg from './SetSvg'
import SetSvged from './SetSvged'
import IcappSvg from './IcappSvg.jsx'
import IcappSvged from './IcappSvged.jsx'

export default function TabBar() {
  const history = useHistory()
  const pathname = history.location.pathname
  return (
    <div className="tabbar-wrapper">
      <div className="content">
        <div className="tab-item">
          <Link to="/tabHome">
            {pathname === '/tabHome' ? <HomeSvged /> : <HomeSvg />}
          </Link>
        </div>
        <div className="tab-item">
          <Link to="/icappps">
            {pathname === '/icappps' ? <IcappSvged /> : <IcappSvg />}
          </Link>
        </div>
        <div className="tab-item">
          <Link to="/swap">
            {pathname === '/swap' ? <SwapSvged /> : <SwapSvg />}
          </Link>
        </div>
        <div className="tab-item">
          <Link to="/record">
            {pathname === '/record' ? <RecordSvged /> : <RecordSvg />}
          </Link>
        </div>
        <div className="tab-item">
          <Link to="/setting">
            {pathname === '/setting' ? <SetSvged /> : <SetSvg />}
          </Link>
        </div>
      </div>
    </div>
  )
}