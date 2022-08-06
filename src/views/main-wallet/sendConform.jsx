import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { urlParameter, selfFixed } from 'utils/utils'
import { useTranslation } from 'react-i18next';
import { getMnemonic,mnemonicToSeedSync } from 'utilService/help'
import ServiceApi from "utilService/ServiceApi"
import MainHeader from 'components/header/MainHeader'
import Loading from 'components/loading'
import Wallet from "@ratel/sdk/dist/wallet";
const Stoic = Wallet("stoic");
const Plug = Wallet("plug");

export default function SendConfirm(){
  const history = useHistory()
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false)
  const [currAccount, setCurrAccount] = useState('')
  const [dif, setDif] = useState(0)
  const [amount, setAmount] = useState(0)
  const [addr, setAddr] = useState('')
  const [actual, setActual] = useState(0)

  useEffect(() => {
    const user = localStorage.getItem('user')
    const dif = urlParameter(history.location.search).dif
    const amount = urlParameter(history.location.search).amount
    const addr = urlParameter(history.location.search).to
    const actual = urlParameter(history.location.search).act

    setDif(dif)
    setAmount(amount)
    setAddr(addr)
    setActual(Number(actual))
    const storageAccount = localStorage.getItem('accounts')
    if (storageAccount) {
      const storageAccountObj = JSON.parse(storageAccount)
      const account = storageAccountObj.find(item => item.address === user)
      setCurrAccount(account)
    }
  }, [])

  const handleSubmit = async () => {
    setIsLoading(true)
    const { type } = currAccount
    let mnemonic, identity;
    mnemonic = getMnemonic(currAccount.password, currAccount.encryMnemonic);

    if (type === 0) {
      //ICPSwap 类型
      identity = mnemonic ? await mnemonicToSeedSync(mnemonic) : null;
    }

    if (type === 1) {
      // type类型为1 表示 plug类型 // -bug
      identity = mnemonic ? await Plug.mnemonicToIdentity(mnemonic) : null;
    }
    if (type === 2) {
      // type类型为2 表示stoic类型
      identity = mnemonic ? await Stoic.mnemonicToIdentity(mnemonic) : null;
    }

    console.log(mnemonic, identity)
    try {
      const serviceApi = new ServiceApi(identity);
      let request = {
        amount: BigInt(actual),
        to: addr,
        fromSubAccountId: null,
      };
      const res = await serviceApi.sendICPTs(request);

      setTimeout(() => {
        setIsLoading(false)
        history.push('/record')
      }, 2000)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setTimeout(() => {
        setIsLoading(false)
        history.push('/record')
      }, 2000)
      // alert('Insufficient Tokens')
    }
  }
  return (
    <div className="tab-common-page">
      <div className="upper-lower-structure">
        <MainHeader />
        <div className="lower-structure">
          <div className="lower-structure-container comm-pd">
            <div className="confirm-rect">
              <p className="title">{t('mhome.pickup_num')}</p>
              <p className="number">{amount} ICP</p>
            </div>
            <div className="card-group-box">
              <div className="flex-grid">
                <div className="grid-one">
                  <div className="grid-l">Send Address</div>
                </div>
                <div className="grid-two">
                  <div className="txt">{addr}</div>
                </div>
              </div>
              <div className="flex-grid">
                <div className="grid-one">
                  <div className="grid-l">{t('mhome.fee')}</div>
                  <p className="grid-r">{10000 / (10 ** 8)} ICP</p>
                </div>
                <div className="grid-two">
                  {/* <input type="text" className="input" /> */}
                  {/* <p className="num">~182ICP</p> */}
                </div>
              </div>
              <div className="flex-grid">
                <div className="grid-one">
                  <div className="grid-l">{t('mhome.act_received')}</div>
                  <p className="grid-r">{selfFixed(dif, 4)} ICP</p>
                </div>
              </div>
            </div>
            <button className="comm-btn__fill accept-btn" onClick={() => handleSubmit()}>{t('mhome.confirm')}</button>
          </div>
        </div>
      </div>
      {
        isLoading && <Loading />
      }
    </div>
  )
}