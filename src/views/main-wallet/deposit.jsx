import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import QRCode from 'qrcode.react';
import MainHeader from 'components/header/MainHeader'
export default function Deposit() {
  const { t } = useTranslation();
  const [currAccount, setCurrAccount] = useState({})
  const [currtap, setCurrtap] = useState(1)

  useEffect(() => {
    const storageAccount = localStorage.getItem('accounts')
    const user = localStorage.getItem('user')

    if (storageAccount) {
      const storageAccountObj = JSON.parse(storageAccount)
      const account = storageAccountObj.find(item => item.address === user)
      setCurrAccount(account)
    }
  }, [])

  const handleTap = (v) => {
    setCurrtap(v)
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
            <div className="tap-box">
              <div className="tap-cc">
                <div className={`tap ${currtap === 1 ? 'active' : null}`} onClick={() => handleTap(1)}>
                  <p>Account ID</p>
                </div>
                <div className={`tap ${currtap === 2 ? 'active' : null}`} onClick={() => handleTap(2)}>
                  <p>Principal ID</p>
                </div>
              </div>
              <div className="line"></div>
            </div>
            <div className="er-code">
              <div className="img">
                <div className="canvas-img">
                  {
                    currtap === 1 ? <QRCode
                      value={`${currAccount.address}`}
                      size={122}
                      fgColor="#000000"
                    /> : <QRCode
                      value={`${currAccount.principalID}`}
                      size={122}
                      fgColor="#000000"
                    />
                  }
                </div>
              </div>
            </div>
            <p className="er-url">{currtap === 1 ? currAccount.address : currAccount.principalID}</p>
            <div className="bottm-btn-box">
              <CopyToClipboard text={currtap === 1 ? currAccount.address : currAccount.principalID} onCopy={() => alert(t('mhome.copy_succ'))}>
                <button className="comm-btn__fill">{t('mhome.copy_addr')}</button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}