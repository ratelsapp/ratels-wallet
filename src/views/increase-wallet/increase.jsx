import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { validator, arrMaxNum } from 'utils/utils'
import { useTranslation } from 'react-i18next';
import { mnemonicToAccount } from '@/utils/account'
import { useICPBalanceCallback } from 'hooks/useICPCalls'
import Wallet from "@ratel/sdk/dist/wallet";
const Stoic = Wallet("stoic");
const Plug = Wallet("plug");
import IncreaseHeader from "components/header/IncreaseHeader"
import Loading from 'components/loading'
import Svgtwo from 'components/svgs/Svgtwo'

const mnemonicRules = {
  username: [
    { required: true, message: 'Enter Wallet Name' }
  ],
  mnemonic: [
    { required: true, message: 'Enter mnemonic phrase' }
  ]
}

export default function Increase() {
  const history = useHistory()
  const typeRef = useRef()
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const [username, setUsername] = useState('')
  const [mnemonic, setMnemonic] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  const userChange = (event) => {
    setUsername(event.target.value)
  }
  const textareaChange = (event) => {
    const val = event.target.value.trim()
    setMnemonic(val)
  }

  useEffect(() => {
    const storageAccount = localStorage.getItem('accounts')
    const reg = /^Account([0-9]*$)/
    const arr = []
    const nums = []
    if (storageAccount) {
      const storageAccountObj = JSON.parse(storageAccount)
      storageAccountObj.forEach(item => {
        if (reg.test(item.username)) {
          arr.push(item.username)
        }
      })
      if (!arr.length) {
        setUsername('Account1')
      } else {
        arr.forEach(item => {
          nums.push(item.substring(7))
        })
        if (nums.length === 1) {
          const numb = Number(nums[0]) + 1
          const name = `Account${numb}`
          setUsername(name)
        } else {
          const numb = arrMaxNum(nums)
          const name = `Account${numb}`
          setUsername(name)
        }
      }
    } else {
      console.log('else')
      setUsername('Account1')
    }
  }, [])

  const handleSubmit = async () => {

    const reg = /[\s\r\n]/g

    if (reg.test(mnemonic[mnemonic.length - 1])) {
      alert('The mnemonic you entered is not valid')
      return
    }

    const type = typeRef.current.selectedIndex
    const paramater = {
      username,
      mnemonic
    }
    console.log(paramater)
    const validateRes = validator(paramater, mnemonicRules)
    if (!validateRes.isRight) {
      alert(validateRes.msg)
      return
    }
    let address = ''
    let principalID = ''
    if (type === 0) {
      const res = await mnemonicToAccount(mnemonic)
      address = res.address
      principalID = res.principalID
    }

    if (type === 1) {
      address = await Plug.identityToAccountId(mnemonic);
      principalID = await Plug.identityToPrincipal(mnemonic);
    }

    if (type === 2) {
      address = Stoic.identityToAccountId(mnemonic, 0);
      principalID = Stoic.identityToPrincipal(mnemonic);
    }


    const storageAccount = localStorage.getItem('accounts')
    if (storageAccount) {
      const storageAccountObj = JSON.parse(storageAccount)
      const hasUser = storageAccountObj.find(item => item.address === address)
      if (hasUser) {
        alert('user already exists')
        return
      }
    }
    setIsLoading(true)
    const balanceRes = await useICPBalanceCallback(address)
    const balance = balanceRes.balances[0]

    const account = {
      type,
      principalId: principalID,
      address,
      mnemonic: mnemonic,
      encryMnemonic: '',
      balance,
      username: username,
      password: ''
    }

    dispatch({
      type: 'SET_CURRACCOUNT',
      currAccount: account
    })
    setIsLoading(false)
    history.push('/setPwd')
  }
  return (
    <div className="common-page">
      <div className="upper-lower-structure">
        <IncreaseHeader title={t('chome.import_mnemonic')} />
        <div className="lower-structure">
          <div className="lower-structure-container">
            <div className="decorate-img import-decorate">
              <Svgtwo />
            </div>
            {/* <p className="sub-tip">{t('chome.import_mnemonic')}</p> */}
            <div className="import-words">
              <div className="card-group-box import-card-group">
                <div className="flex-grid">
                  <div className="grid-one">
                    <div className="grid-l">{t('chome.wallet_name')}</div>
                  </div>
                  <div className="grid-two">
                    {/* <input type="text" value={username} onChange={(e) => userChange(e)} className="input-wallet-import" /> */}
                    <p>{username}</p>
                  </div>
                </div>
                <div className="flex-grid">
                  <div className="grid-one">
                    <div className="grid-l">Select Mnemonic</div>
                  </div>
                  <div className="grid-two">
                    <div className="select import-select">
                      <select ref={typeRef}>
                        <option value="0">Ratels,ICPSwap - Ed25519Key</option>
                        <option value="1">Plug - Secpk256k1</option>
                        <option value="2">Stoic - Ed25519Key</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="menc-wrap">
                <div className="textera-box">
                  <textarea value={mnemonic} onChange={(e) => textareaChange(e)} placeholder={t('chome.enter_mnemonic')}></textarea>
                </div>
              </div>
            </div>
            <div className="button-group">
              <button className="comm-btn__fill increase" onClick={() => handleSubmit()} >{t('chome.confirm_btn')}</button>
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