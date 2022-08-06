import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import Svgone from 'components/svgs/Svgone'
export default function Home(){
  const history = useHistory()
  const { t } = useTranslation();

  // useEffect(async () => {
  //   const storageAccount = localStorage.getItem('accounts')
  //   const user = localStorage.getItem('user')


  //   if (storageAccount) {
  //     history.push('/tabHome')
  //     return
  //   }
  // },[])

  const linkIncrease = () => {
    history.push('/register')
  }

  const linkPort = () => {
    history.push('/increase')
  }
  return (
    <div className="common-page create-page">
      <div className="create-wallet-nav">
        <div className="logo">
          <Svgone />
        </div>
        <div className="button-group">
          <button className="comm-btn__fill increase" onClick={() => linkIncrease()}>{t('chome.createWallet')}</button>
          <button className="comm-btn__rect" onClick={() => linkPort()}>{t('chome.importWallet')}</button>
        </div>
      </div>
    </div>
  )
}