import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import MainHeader from 'components/header/MainHeader'
import TabBar from 'components/tabbar'
export default function Setting() {
  const { t } = useTranslation();
  const handleClick = () => {
    alert('coming soon')
  }
  const handleUserChange = (v) => {
    console.log(v)
  }
  return (
    <div className="tab-common-page">
      <div className="upper-lower-structure">
        <MainHeader leftType='menu' onUserChange={(v) => handleUserChange(v)} />
        <div className="sturcture-center">
          <div className="medium-scroll-cc">
            <div className="nav-card-list">
              <Link className="nav-item" to="/walletManage">
                <p className="title">{t('mhome.account_manage')}</p>
                <i className="icon"></i>
              </Link>
              <Link className="nav-item" to="/addrManage">
                <p className="title">{t('mhome.addr_book')}</p>
                <i className="icon"></i>
              </Link>
              <div className="nav-item" onClick={() => { handleClick() }}>
                <p className="title">{t('mhome.lock_time')}</p>
                <i className="icon"></i>
              </div>
              <div className="nav-item" onClick={() => { handleClick() }}>
                <p className="title">{t('mhome.edit_pwd')}</p>
                <i className="icon"></i>
              </div>
              <Link className="nav-item" to="/aboutUs">
                <p className="title">{t('mhome.about_us')}</p>
                <i className="icon"></i>
              </Link>
            </div>
          </div>
        </div>
        <TabBar />
      </div>
    </div>
  )
}