import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import SvgSucc from 'components/svgs/SvgSucc'
export default function WalletSuccess() {
  const history = useHistory()
  const { t } = useTranslation();
  const currAccount = useSelector(state => state.currAccount)
  const succesLink = () => {
    history.push('/tabHome')
  }
  return (
    <div className="common-page success-page">
      <div className="create-wallet-nav">
        <div className="logo">
          <SvgSucc />
        </div>
        <p className="succ-tip">{t('chome.create_succ')}</p>
        <p className="succ-sub-tip">{currAccount.username} {t('chome.succ_wallet_tips')}</p>
        <div className="button-group">
          <button className="comm-btn__fill increase" onClick={() => succesLink()}>{t('chome.confirm_btn')}</button>
        </div>
      </div>
    </div>
  )
}