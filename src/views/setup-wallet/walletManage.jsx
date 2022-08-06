import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { addressSecret } from 'utils/utils'
import { useTranslation } from 'react-i18next';
import MainHeader from 'components/header/MainHeader'
import PasswordValide from 'components/dialog/PasswordValide'
import SvgCopy from 'components/svgs/SvgCopy'
import CheckNone from 'components/svgs/CheckNone'
import CheckSelected from 'components/svgs/CheckSelected'
const md5 = require('md5')
const EVO = 10 ** 8
export default function WalletManage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const [pwd,setPwd] = useState('')
  const [btntype,setBtntype] = useState('')
  const [userList, setUserList] = useState([])
  const [curr, setCurr] = useState('')
  const [dialogVisible, setDialogVisible] = useState(false)

  useEffect(() => {
    const storageAccount = localStorage.getItem('accounts')
    const user = localStorage.getItem('user')
    if (storageAccount) {
      const storageAccountObj = JSON.parse(storageAccount)
      const account = storageAccountObj.find(item => item.address === user)
      setUserList(storageAccountObj)
      setCurr(user)
    }
  }, [curr])

  const selectItem = (event, address) => {
    setCurr(address)
    localStorage.setItem('user', address)
  }

  const handleChange = (event) => {
    setPwd(event.target.value)
  }

  const handleExport = () => {
    setBtntype('export')
    setDialogVisible(true)
  }
  const handleRemove = () => {
    setBtntype('remove')
    setDialogVisible(true)
  }
  const delDialogClose = () => {
    setDialogVisible(false)
    setPwd('')
  }
  const dialConfirm = () => {
    const currItem = userList.find(item => item.address === curr)
    if(!currItem){
      alert('not exsist')
      return
    }
    if(currItem.password !== md5(pwd)){
      alert('password was error')
      return
    }

    if(btntype === 'remove'){
      const currIndex = userList.findIndex(item => item.address === curr)
      userList.splice(currIndex)
      console.log(userList)
      
      if(userList.length){
        localStorage.setItem('accounts',JSON.stringify(userList))
        localStorage.setItem('user',userList[0].address)
        window.location.reload()
      }else{
        localStorage.removeItem('user')
        localStorage.removeItem('accounts')
        history.push('/')
      }
    }
    if(btntype === 'export'){
      console.log(currItem.mnemonic)
      dispatch({
        type: 'SET_EXPORTMNOIC',
        exportMnoic: currItem.mnemonic
      })
      history.push('/WalletExport')
    }
    
  }

  const handleUserChange = (v) => {
    console.log(v)
  }
  return (
    <div className="tab-common-page">
      <div className="upper-lower-structure">
        <MainHeader onUserChange={(v) => handleUserChange(v)} />
        <div className="sturcture-center-setup">
          <div className="setup-center-scroll">
            <div className="wallet-list">
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
                            <span className="strong">{(item.balance.value / EVO).toFixed(3)} ICP</span>
                            <span className="thin">{(item.balance.value / EVO).toFixed(3)} ICP</span>
                          </div>
                        </div>

                        <div className="bottm">
                          <p className="zh">{addressSecret(item.address)}</p>
                          <CopyToClipboard text={item.address} onCopy={() => message.success(t('mhome.copy_succ'))}>
                            <span className="copy"><SvgCopy /></span>
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
                <button className="comm-btn__fill increase" onClick={(e) => handleExport()}>{t('mhome.export_mnemonic')}</button>
              </div>
              <div className="btn">
                <button className="comm-btn__rect" onClick={(e) => handleRemove()}>{t('mhome.remove_wallet')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        dialogVisible && (
          <PasswordValide onClose={() => delDialogClose()}>
            <div className="center-card-box">
              <div className="title">{t('mhome.enter_repwd')}</div>
              <div className="rect-enter">
                <input type="password" value={pwd} onChange={(e) => handleChange(e)} placeholder="输入密码" />
              </div>
              <div className="button-group-inline">
                <button className="comm-btn__rect" onClick={() => delDialogClose()}>{t('mhome.cancel')}</button>
                <button className="comm-btn__fill increase" onClick={() => dialConfirm()}>{t('mhome.confirm_btn')}</button>
              </div>
            </div>
          </PasswordValide>
        )
      }
    </div>
  )
}