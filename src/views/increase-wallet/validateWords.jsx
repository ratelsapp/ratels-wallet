import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { randomRange } from 'utils/utils'
import { useTranslation } from 'react-i18next';
import IncreaseHeader from "components/header/IncreaseHeader"
import Svgtwo from 'components/svgs/Svgtwo'
const _ = require('lodash')

export default function ValidateWords() {
  const history = useHistory()
  const { t } = useTranslation();
  const wordsArray = useSelector(state => state.wordsArray)
  const currAccount = useSelector(state => state.currAccount)

  const [words, setWords] = useState([])

  useEffect(() => {
    console.log('useEffect')
    let arrs = []
    let valids = []
    function recursionPush() {
      const index = randomRange(0, 23)
      if (arrs.indexOf(index) === -1) {
        arrs.push(index)
      }
      if (arrs.length < 8) {
        recursionPush()
      } else {
        arrs.forEach(item => {
          valids.push(wordsArray[item])
        })

        const validSrot = valids.sort(function (a, b) {
          return a.id - b.id
        })

        setWords(validSrot)
      }
    }
    recursionPush()
  }, [])

  const handleChange = (e, obj) => {
    const v = e.target.value
    obj.val = v.replace(/[\r\n]/g, "").trim()
    const new_valids = _.cloneDeep(words)
    setWords(new_valids)
  }

  const handleSubmit = () => {
    const isThrough = words.every(valid => {
      console.log(valid.val, valid.txt)
      return valid.val === valid.txt
    })
    if (!isThrough) {
      alert('check mnemonic')
      return
    }

    const account = {
      type: currAccount.type,
      principalID: currAccount.principalId,
      address: currAccount.address,
      balance: currAccount.balance,
      encryMnemonic: currAccount.encryMnemonic,
      password: currAccount.password,
      username: currAccount.username
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

    history.push('/walletSucc')
  }
  return (
    <div className="common-page">
      <div className="upper-lower-structure">
        <IncreaseHeader title={t('chome.backup')} />
        <div className="lower-structure">
          <div className="lower-structure-container">
            <div className="decorate-img">
              <Svgtwo />
            </div>
            <p className="sub-tip">{t('chome.mn_valid')}</p>
            <div className="words-input-wrap">
              <div className="input-wrap-cc">
                {
                  words.map(valid => {
                    return (
                      <div className="input-item" key={valid.id}>
                        <p className="no">#{valid.id}</p>
                        <input type="text" value={valid.val} onChange={(e) => handleChange(e, valid)} className="txt" />
                        {/* <p>{valid.txt}</p> */}
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className="button-group">
              <button className="comm-btn__fill increase" onClick={() => handleSubmit()} >{t('chome.confirm_btn')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}