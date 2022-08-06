
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { generate } from 'utils/mnemonic'
import { mnemonicToAccount,encryptMnemonic } from 'utils/account'
import { useICPBalanceCallback } from 'hooks/useICPCalls'
import { validator } from 'utils/utils'
import IncreaseHeader from "components/header/IncreaseHeader"
import Loading from 'components/loading'
import Svgone from 'components/svgs/Svgone'
import EyeOpen from 'components/svgs/EyeOpen'
import EyeClose from 'components/svgs/EyeClose'

const md5 = require('md5')

const registerRules = {
  username: [
    { required: true, message: 'Username is required' }
  ],
  password: [
    { required: true, message: 'Password is required' },
    { validator: /^[a-zA-Z0-9\_\$\*\+\#\@\!]{8,15}$/, message: 'Password allowed：a-z, A-Z, 0-9, and common characters.' }
  ],
  rePassword: [
    { compare: 'password', message: 'Same as the password' },
    { validator: /^[a-zA-Z0-9\_\$\*\+\#\@\!]{8,15}$/, message: 'Password allowed：a-z, A-Z, 0-9, and common characters.' }
  ]
}

export default function Register(){
  const history = useHistory()
  const dispatch = useDispatch()
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [pwdeye, setPwdeye] = useState(false)
  const [repwdeye, setRepwdeye] = useState(false)

  const [mnemonic, setMnemonic] = useState('')
  const [address, setAddress] = useState('')
  const [principalId, setPrincipalId] = useState('')

  useEffect(async () => {
    const words = generate()
    const user = await mnemonicToAccount(words)
    setMnemonic(words)
    setAddress(user.address)
    setPrincipalId(user.principalID)
  }, [])

  const attrEnum = {
    'username': setUsername,
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

  const handleSubmit = async ()=>{
    const paramater = {
      username,
      password: md5(password),
      rePassword: md5(rePassword)
    }
    const validateRes = validator({ username, password, rePassword }, registerRules)
    if (!validateRes.isRight) {
      alert(validateRes.msg)
      return
    }

    setIsLoading(true)
    const storageAccount = localStorage.getItem('accounts')
    if (storageAccount) {
      const storageAccountObj = JSON.parse(storageAccount)
      const hasUser = storageAccountObj.find(item => item.address === address)
      if(hasUser){
        alert('user already exists')
        return 
      }
    }
    const balanceRes = await useICPBalanceCallback(address)
    const balance = balanceRes.balances[0]
    setIsLoading(false)
    
    const encryMnemonic = encryptMnemonic(paramater.password)(mnemonic)
    const account = {
      type: 0,
      principalId,
      address,
      mnemonic,
      encryMnemonic,
      balance,
      username: paramater.username,
      password: paramater.password
    }
    console.log(account,'+++')
    dispatch({
      type: 'SET_CURRACCOUNT',
      currAccount: account
    })

    history.push('/words')
  }

  return (
    <div className="common-page">
      <div className="upper-lower-structure">
        <IncreaseHeader />
        <div className="lower-structure">
          <div className="lower-structure-container">
            <div className="decorate-img register-decorate">
              {/* <img src={bg1} alt="" /> */}
              <Svgone />
            </div>
            <div className="card-wrap register-form">
              <div className="form-wrap">
                <div className="form-item">
                  <p className="name">{t('chome.enter_name')}</p>
                  <div className="iput">
                    <input type="text" value={username} onChange={(e) => handleChange(e, 'username')} placeholder={t('chome.enter_name')} />
                  </div>
                </div>
                <div className="form-item">
                  <p className="name">{t('chome.enter_pwd')}</p>
                  <div className="iput">
                    <input type={pwdeye ? 'text' : 'password'} value={password} onChange={(e) => handleChange(e, 'password')} placeholder={t('chome.enter_pwd')} />
                    {/* <i className="icon" onClick={(e) => toggleEye(e, 'pwdeye')}></i> */}
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
              <button className="comm-btn__fill increase" onClick={() => handleSubmit()} >{t('chome.create')}</button>
            </div>
          </div>
        </div>
      </div>
      {
        isLoading && <Loading />
      }
    </div>
  )
}