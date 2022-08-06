import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { urlParameter, validator, selfFixed } from 'utils/utils'
import { isValidAddress } from 'utilService/help'

import MainHeader from 'components/header/MainHeader'
const registerRules = {
  amount: [
    { required: true, message: 'Enter Amount' },
    { validator: /^[0-9]+([.]{1}[0-9]+){0,1}$/, message: 'Rules do not match' }
  ],
  toAddr: [
    { required: true, message: 'Enter Address' }
  ]
}

export default function Send(){
  const history = useHistory()
  const { t } = useTranslation();
  const [amount, setAmount] = useState('')
  const [toAddr, setToAddr] = useState('')
  const [balance, setBalance] = useState(0)
  const [amountDif, setAmountDif] = useState(0)

  const [total, setTotal] = useState(0)
  const [acutual, setActual] = useState(0)

  useEffect(() => {
    let balance = urlParameter(history.location.search).balance
    if (balance === '0.000') {
      balance = '0'
    }
    setBalance(balance)

    const user = localStorage.getItem('user')
    const storageAccount = localStorage.getItem('accounts')
    if (storageAccount) {
      const storageAccountObj = JSON.parse(storageAccount)
      const account = storageAccountObj.find(item => item.address === user)
      setTotal(account.balance.value)
    }
  }, [])

  const amountChange = (e) => {
    console.log(e.target.value)
    setAmount(e.target.value)
    const a = Number(e.target.value)
    let dif = selfFixed((a - (10000 / (10 ** 8))), 4)
    if (e.target.value === '' || e.target.value === 0) {
      dif = 0
    }

    setAmountDif(dif)

    const sendBig = a * (10 ** 8)
    setActual(sendBig - 10000)
  }
  const addrChange = (e) => {
    setToAddr(e.target.value)
  }

  const handleStepNext = async () => {
    const validateRes = validator({ amount, toAddr }, registerRules)
    if (!validateRes.isRight) {
      alert(validateRes.msg)
      return
    }
    if (!isValidAddress(toAddr)) {
      alert('Address allowed：a-z, A-Z, 0-9.')
      return
    }
    if (balance * 1000 < amount * 1000) {
      alert('Insufficient Tokens')
      return
    }
    history.push(`/confirmSend?balance=${balance}&amount=${amount}&to=${toAddr}&dif=${amountDif}&act=${acutual}`)
  }

  const handleMax = () => {
    setAmount(balance)
    const a = Number(balance)
    let dif = (a - (10000 / (10 ** 8)))
    if (balance === '' || balance === 0) {
      dif = 0
    }
    setAmountDif(dif)

    setActual(total - 10000)
  }

  return (
    <div className="tab-common-page">
      <div className="upper-lower-structure">
        <MainHeader />
        <div className="lower-structure">
          <div className="lower-structure-container comm-pd deposit-structor">
            {/* <div className="select-box">
              <p className="name">{t('mhome.s_token')}</p>
              <div className="select">
                <select id="">
                  <option value="1">ICP</option>
                </select>
              </div>
            </div> */}

            <div className="card-box">
              <div className="flex-between">
                <p className="name">{t('mhome.trans_to')}</p>
              </div>
              <div className="flex-between">
                <p className="input">
                  <input type="text" value={toAddr} onChange={(e) => addrChange(e)} placeholder={t('mhome.addr')} />
                </p>
              </div>
            </div>
            <p className="yued"></p>
            <div className="card-box">
              <div className="flex-between">
                <p className="name">{t('mhome.trans_amount')}</p>
                <p className="flex-r">{t('mhome.can_pickup')}：{balance} ICP</p>
              </div>
              <div className="flex-between">
                <p className="input">
                  <input type="text" value={amount} onChange={(e) => amountChange(e)} placeholder={t('mhome.enter_amount')} />
                </p>
                <p className="max" onClick={() => handleMax()}>MAX</p>
              </div>
            </div>

            <div className="flex-between sxf">
              <p className="flex-l">{t('mhome.act_received')}：{selfFixed(amountDif, 4)} ICP</p>
              <p className="flex-r">{t('mhome.fee')}：{10000 / (10 ** 8)}ICP</p>
            </div>

            <div className="bottm-btn-box">
              <button className="comm-btn__fill accept-btn" onClick={() => handleStepNext()}>{t('chome.next')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}