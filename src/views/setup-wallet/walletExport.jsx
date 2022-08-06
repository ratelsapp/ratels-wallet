import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { message } from 'antd';
import { addressSecret } from 'utils/utils'
import { useTranslation } from 'react-i18next';
import MainHeader from 'components/header/MainHeader'
import Svgtwo from 'components/svgs/Svgtwo'
export default function WalletManage() {
  const history = useHistory()
  const { t } = useTranslation();
  const [words, setWords] = useState([])
  const exportMnoic = useSelector(state => state.exportMnoic)

  useEffect(() => {
    const mnemonicArr = exportMnoic.split(' ')
    const newArr = []
    mnemonicArr.forEach((item, i) => {
      newArr.push({
        id: i + 1,
        txt: item,
        val: ''
      })
    })
    setWords(newArr)
  }, [])

  const handleUserChange = () => {

  }
  const handleSubmit = () => {

  }
  return (
    <div className="tab-common-page">
      <div className="upper-lower-structure">
        <MainHeader onUserChange={(v) => handleUserChange(v)} />
        <div className="lower-structure">
          <div className="lower-structure-container">
            <div className="decorate-img words-page">
              <Svgtwo />
            </div>
            <div className="card-wrap backup">
              <div className="words-list">
                <div className="content">
                  {
                    words.map(word => {
                      return (
                        <div className="words-item" key={word.id}>
                          <p className="no">#{word.id}</p>
                          <p className="word">{word.txt}</p>
                        </div>
                      )
                    })
                  }
                </div>
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