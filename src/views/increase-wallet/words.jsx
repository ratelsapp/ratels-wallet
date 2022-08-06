import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import IncreaseHeader from "components/header/IncreaseHeader"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import Svgtwo from 'components/svgs/Svgtwo'
import SvgWarn from 'components/svgs/SvgWarn'
export default function Words() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const currAccount = useSelector(state => state.currAccount)
  const [words, setWords] = useState([])
  const [copyDialog, setCopyDialog] = useState(false)


  useEffect(() => {
    const mnemonicArr = currAccount.mnemonic.split(' ')
    const newArr = []
    mnemonicArr.forEach((item, i) => {
      newArr.push({
        id: i + 1,
        txt: item,
        val: ''
      })
    })
    dispatch({
      type: 'SET_WORDSARRAY',
      wordsArray: newArr
    })
    setWords(newArr)
  }, [])
  const handleSubmit = () => {
    history.push('/wordsValidate')
  }
  const openCopy = () => {
    setCopyDialog(true)
  }
  const closeCopy = () => {
    setCopyDialog(false)
  }
  const copySuccess = () => {
    alert(t('mhome.copy_succ'))
    setCopyDialog(false)
  }
  return (
    <div className="common-page">
      <div className="upper-lower-structure">
        <IncreaseHeader title={t('chome.backup')} />
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
              <button className="comm-btn__fill increase" onClick={() => handleSubmit()} >{t('chome.next')}</button>
            </div>
          </div>
        </div>
      </div>
      <div className="copy-dom" onClick={() => openCopy()}>{t('chome.copy')}</div>
      {copyDialog && <div className="copy-dialog">
        <div className="copy-mask" onClick={() => closeCopy()}></div>
        <div className="copy-container">
          <div className="copy-content">
            <div className="warn-box">
              <SvgWarn />
              <p className="warn-txt">{t('chome.warn')}</p>
            </div>
            <div className="tips">
              <p>{t('chome.mn_warn_tip')}</p>
            </div>
            <div className="copy-btns">
              <button className="comm-btn__fill" onClick={() => closeCopy()}>{t('chome.cancel_copy')}</button>
              <CopyToClipboard text={currAccount.mnemonic} onCopy={() => copySuccess()}>
                <button className="comm-btn__rect">{t('chome.stick_copy')}</button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}