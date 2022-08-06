import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory,Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { ICPPriceActor } from 'utils/icp-price/ICPPriceActor'
import { dealwidthproposal } from 'utils/account'
import { selfFixed } from 'utils/utils'
import { useICPBalanceCallback } from 'hooks/useICPCalls'
import MainHeader from 'components/header/MainHeader'
import TabBar from 'components/tabbar'
import HomePerpty from 'components/main-home/HomePerpty'
import HomeNft from 'components/main-home/HomeNft'

import DepositSvg from 'components/svgs/DepositSvg'
import SendSvg from 'components/svgs/SendSvg'
import ExchangeSvg from 'components/svgs/ExchangeSvg'

const EVO = 10 ** 8

export default function Home() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const [currtap, setCurrtap] = useState(1)
  const [worth, setWorth] = useState(0)
  const [balance, setBalance] = useState(0)
  const [symbolType, setSymbolType] = useState('ICP')
  const [isLoading, setIsLoading] = useState(false)
  const [diff, setDiff] = useState(0)
  const [currUser, setCurrUser] = useState('')

  useEffect(async () => {
    console.log('useEffect')
    let account
    const storageAccount = localStorage.getItem('accounts')
    const user = localStorage.getItem('user')


    if (!storageAccount) {
      history.push('/index')
      return
    }

    const storageAccountObj = JSON.parse(storageAccount)
    account = storageAccountObj.find(item => item.address === user)
    setCurrUser(user)
    const balanceRes = await useICPBalanceCallback(user)
    const balanceNum = balanceRes.balances[0]
    account.balance = balanceNum

    storageAccountObj.forEach(item => {
      if (item.address === user) {
        item.balance = balanceNum
      }
    })
    localStorage.setItem('accounts', JSON.stringify(storageAccountObj))

    dispatch({
      type: 'SET_CURRACCOUNT',
      currAccount: account
    })

    setIsLoading(true)
    const balance = selfFixed((Number(account.balance.value) / EVO), 4)
    setBalance(balance)
    setIsLoading(false)
    console.log(balanceRes)
  }, [currUser])

  const handleTap = (v) => {
    setCurrtap(v)
  }
  const handleUserChange = (v) => {
    setCurrUser(v)
  }
  const handleExchange = () => {
    alert('coming soon')
  }
  return (
    <div className="tab-common-page">
      <div className="upper-lower-structure">
        <MainHeader leftType='menu' onUserChange={(v) => handleUserChange(v)} />
        <div className="sturcture-center">
          <div className="structure-container">
            <div className="container-cc">
              <div className="dse-card">
                <div className="sum-money">
                  <p>${worth}</p>
                </div>
                <div className="account-operate">
                  <Link to="/deposit" className="operate-item">
                    <p className="item-icon">
                      <DepositSvg />
                    </p>
                    <p className="name">Receive</p>
                  </Link>
                  <p className="jg-line"></p>
                  <Link to={`/send?balance=${balance}`} className="operate-item">
                    <p className="item-icon">
                      <SendSvg />
                    </p>
                    <p className="name">Send</p>
                  </Link>
                  <p className="jg-line"></p>
                  <div className="operate-item" onClick={() => handleExchange()}>
                    <p className="item-icon">
                      <ExchangeSvg />
                    </p>
                    <p className="name">Swap</p>
                  </div>
                </div>
              </div>
              <div className="tap-box">
                <div className="tap-cc">
                  <div className={`tap ${currtap === 1 ? 'active' : null}`} onClick={() => handleTap(1)}>
                    <p>{t('mhome.assets')}</p>
                  </div>
                  <div className={`tap ${currtap === 2 ? 'active' : null}`} onClick={() => handleTap(2)}>
                    <p>NFT</p>
                  </div>
                </div>
                <div className="line"></div>
              </div>
              <div className="medium-scroll-wrapper">
                <div className="medium-scroll-cc">
                  {
                    currtap === 1 ? <HomePerpty balance={balance} worth={worth} symbolType={symbolType} isLoading={isLoading} /> : <HomeNft />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <TabBar />
      </div>
    </div>
  )
}