import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { encryptMnemonic } from '@/utils/account'
import { validator } from 'utils/utils'
import { useTranslation } from 'react-i18next';
import IncreaseHeader from "components/header/IncreaseHeader"
import Svgone from 'components/svgs/Svgone'
import EyeOpen from 'components/svgs/EyeOpen'
import EyeClose from 'components/svgs/EyeClose'
const md5 = require('md5')

const setpwdRule = {
  password: [
    { required: true, message: 'Password is required' },
    { validator: /^[a-zA-Z0-9\_\$\*\+\#\@\!]{8,15}$/, message: 'Rules do not match' }
  ],
  rePassword: [
    { compare: 'password', message: 'Same as the password' },
    { validator: /^[a-zA-Z0-9\_\$\*\+\#\@\!]{8,15}$/, message: 'Rules do not match' }
  ]
}

export default function SetPwd() {
  const history = useHistory()
  const { t } = useTranslation();
  const currAccount = useSelector(state => state.currAccount)
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [pwdeye, setPwdeye] = useState(false)
  const [repwdeye, setRepwdeye] = useState(false)
  const attrEnum = {
    'password': setPassword,
    'rePassword': setRePassword,
    'pwdeye': {
      val: pwdeye,
      set: setPwdeye
    },
    'repwdeye': {
      val: repwdeye,
      set: setRepwdeye
    }
  }
  const handleChange = (event, attr) => {
    attrEnum[attr](event.target.value)
  }
  const toggleEye = (event, attr) => {
    const v = attrEnum[attr].val ? false : true
    attrEnum[attr].set(v)
  }
  const handleSubmit = () => {
    const validateRes = validator({ password, rePassword }, setpwdRule)
    if (!validateRes.isRight) {
      alert(validateRes.msg)
      return
    }
    const paramater = {
      password: md5(password),
      rePassword: md5(rePassword)
    }

    const encryMnemonic = encryptMnemonic(paramater.password)(currAccount.mnemonic)
    const account = {
      type: currAccount.type,
      principalID: currAccount.principalId,
      address: currAccount.address,
      mnemonic: currAccount.mnemonic,
      encryMnemonic: encryMnemonic,
      balance: currAccount.balance,
      username: currAccount.username,
      password: paramater.password
    }

    const storageAccount = localStorage.getItem('accounts')
    if (storageAccount) {
      const storageAccountObj = JSON.parse(storageAccount)
      storageAccountObj.push(account)
      localStorage.setItem('accounts', JSON.stringify(storageAccountObj))
    } else {
      const arr = [account]
      const accountStr = JSON.stringify(arr)
      localStorage.setItem('accounts', accountStr)
    }
    localStorage.setItem('user', currAccount.address)
    history.push('/tabHome')
  }

  return (
    <div className="common-page">
      <div className="upper-lower-structure">
        <IncreaseHeader title={t('chome.create_w_name')} />
        <div className="lower-structure">
          <div className="lower-structure-container">
            <div className="decorate-img register-decorate">
              <Svgone />
            </div>
            <div className="card-wrap register-form">
              <div className="form-wrap">

                <div className="form-item">
                  <p className="name">{t('chome.enter_pwd')}</p>
                  <div className="iput">
                    <input type={pwdeye ? 'text' : 'password'} value={password} onChange={(e) => handleChange(e, 'password')} placeholder={t('chome.enter_pwd')} />
                    <div className="icon" onClick={(e) => toggleEye(e, 'pwdeye')}>
                      {pwdeye ? <EyeOpen /> : <EyeClose />}
                    </div>
                  </div>
                </div>
                <div className="form-item">
                  <p className="name">{t('chome.enter_repwd')}</p>
                  <div className="iput">
                    <input type={repwdeye ? 'text' : 'password'} value={rePassword} onChange={(e) => handleChange(e, 'rePassword')} placeholder={t('chome.enter_repwd')} />
                    <div className="icon" onClick={(e) => toggleEye(e, 'repwdeye')}>
                      {repwdeye ? <EyeOpen /> : <EyeClose />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="button-group">
              <button className="comm-btn__fill increase" onClick={() => handleSubmit()} >{t('chome.import')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}