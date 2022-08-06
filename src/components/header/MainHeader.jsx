import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { addressSecret, selfFixed } from 'utils/utils'
import SvgMenu from 'components/svgs/SvgMenu'
import SvgBack from 'components/svgs/SvgBack'
import CheckNone from 'components/svgs/CheckNone'
import CheckSelected from 'components/svgs/CheckSelected'
import SvgCopy from 'components/svgs/SvgCopy'

import avatar from 'assets/images/head_portrait@3x.png'

const EVO = 10 ** 8

export default function MainHeader(props) {
  const history = useHistory()
  const { t } = useTranslation();
  const [currAccount, setCurrAccount] = useState({})
  const { leftType, onUserChange } = props

  const [userList, setUserList] = useState([])
  const [curr, setCurr] = useState('')
  const [dialogVisible, setDialogVisible] = useState(false)
  const [secAddr, setSecAddr] = useState('')


  useEffect(() => {
    const storageAccount = localStorage.getItem('accounts')
    const user = localStorage.getItem('user')

    if (storageAccount) {
      setSecAddr(addressSecret(user))
      const storageAccountObj = JSON.parse(storageAccount)
      const account = storageAccountObj.find(item => item.address === user)
      setCurrAccount(account)
      setUserList(storageAccountObj)
      setCurr(user)
    }
  }, [curr])

  const selectItem = (event, address) => {
    setCurr(address)
    setDialogVisible(false)
    localStorage.setItem('user', address)
    onUserChange(address)
  }

  const linkIncrease = () => {
    history.push('/register')
  }
  const linkPort = () => {
    history.push('/increase')
  }
  const toggleShow = () => {
    setDialogVisible(!dialogVisible)
  }
  const handleBack = () => {
    history.goBack()
  }
  return (
    <div className="header-layout">
      <div className="content">
        {
          leftType === 'menu' ?
            (
              <div className="menu-icon" onClick={() => toggleShow()}>
                <SvgMenu />
              </div>
            )
            :
            <div className="menu-icon" onClick={() => handleBack()}>
              <SvgBack />
            </div>
        }
        <div className="header-center">
          <div className="header-center-cc">
            <p className="title">{currAccount.username}</p>

            <CopyToClipboard text={currAccount.address} onCopy={() => alert(t('mhome.copy_succ'))}>
              <p className="name">{secAddr}</p>
            </CopyToClipboard>

          </div>
        </div>
        <div className="avatar-icon">
          {/* <img src={avatar} alt="" /> */}
        </div>
      </div>
      {
        dialogVisible && (
          <div className="dialog-account-box">
            <div className="mask" onClick={() => toggleShow()}></div>
            <div className="accont-list">
              <div className="list-cc">
                {
                  userList.map(item => {
                    return (
                      <div className={`list-item ${curr === item.address ? 'active' : ''}`} key={item.address}>
                        <div onClick={(e) => selectItem(e, item.address)}>
                          <div className="user-info">
                            <i className="avatar"></i>
                            <p className="name">{item.username}</p>
                          </div>
                          <div className="balance-box">
                            <span className="strong">{selfFixed((item.balance.value / EVO), 4)} ICP</span>
                            <span className="thin">{selfFixed((item.balance.value / EVO), 4)} ICP</span>
                          </div>
                        </div>

                        <div className="bottm">
                          <p className="zh">{addressSecret(item.address)}</p>
                          <CopyToClipboard text={item.address} onCopy={() => alert(t('mhome.copy_succ'))}>
                            <span className="copy">
                              <SvgCopy />
                            </span>
                          </CopyToClipboard>

                        </div>
                        <div className="selected" onClick={(e) => selectItem(e, item.address)}>
                          {curr === item.address ? <CheckSelected /> : <CheckNone />}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <div className="btn">
                <button className="comm-btn__fill increase" onClick={() => linkIncrease()}>{t('chome.createWallet')}</button>
              </div>
              <div className="btn">
                <button className="comm-btn__rect" onClick={() => linkPort()}>{t('chome.importWallet')}</button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}