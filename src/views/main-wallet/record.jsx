import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next';

import { useICPTransactionsCallback } from '@/hooks/useICPCalls'
import { addressSecret, selfFixed } from 'utils/utils'
import dayjs from "dayjs";
import Loading from 'components/loading'
import Empty from 'components/Empty'

import MainHeader from 'components/header/MainHeader'
import TabBar from 'components/tabbar'
import TradeRecord from 'components/record/tradeRecord'
import AuthRecord from 'components/record/authRecord'

const ICP_TRANSFER_TYPE_FORMAT = {
  TRANSACTION: "transfer",
}
export default function Record() {
  const { t } = useTranslation();
  const [currtap, setCurrtap] = useState(1)
  const handleTap = (v) => {
    setCurrtap(v)
  }
  const [records, setRecords] = useState([])
  const [user, setUser] = useState('')
  const icpTransactionsCallback = useICPTransactionsCallback();
  const [isLoading, setIsLoading] = useState(false)

  const handleUserChange = (v) => {
    const user = localStorage.getItem('user')
    getTransferList(user)
  }



  const getTransferList = async (address) => {
    setIsLoading(true)
    let list = [];
    const result = await icpTransactionsCallback(address);
    const _result = { ...result };
    let data = _result.transactions || [];
    data.map((item) => {
      const { transaction } = item;
      const { operations, metadata, transaction_identifier } = transaction || {};
      switch (operations.length) {
        case 3:
          item.timestamp = metadata.timestamp;
          item.hash = transaction_identifier?.hash ?? "";
          item.memo = metadata.memo;
          item.block_height = metadata.block_height;
          item.status = operations[0].metadata;
          item.type = ICP_TRANSFER_TYPE_FORMAT[operations[0].type];
          item.from = operations[0].account.address;
          item.to = operations[1].account.address;
          item.decimals = operations[0].amount.currency.decimals;
          item.symbol = operations[0].amount.currency.symbol;
          item.amount = operations[1].amount.value;
          item.fee = -Number(operations[2].amount.value);
          break;
        default:
          break;
      }
    });
    list = data;
    list.forEach(item => {
      const unix = String(item.timestamp).substring(0, 13)
      const nunix = Number(unix)
      item.timestamp = dayjs(nunix).format("YYYY-MM-DD HH:mm:ss")
    })
    setRecords(list)
    setIsLoading(false)
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    setUser(user)
    getTransferList(user)
  }, [])

  return (
    <div className="tab-common-page">
      <div className="upper-lower-structure">
        <MainHeader leftType='menu' onUserChange={(v) => handleUserChange(v)} />
        <div className="sturcture-center">
          <div className="structure-container">
            <div className="container-cc">
              <div className="tap-box">
                <div className="tap-cc">
                  <div className={`tap ${currtap === 1 ? 'active' : null}`} onClick={() => handleTap(1)}>
                    <p>{t('mhome.trans_record')}</p>
                  </div>
                  <div className={`tap ${currtap === 2 ? 'active' : null}`} onClick={() => handleTap(2)}>
                    <p>{t('mhome.auto_record')}</p>
                  </div>
                </div>
                <div className="line"></div>
              </div>
              <div className="medium-scroll-wrapper medium-activity">
                <div className="medium-scroll-cc">
                  {
                    currtap === 1 ? (
                      <div className="trade-list">
                        {
                          records.length > 0 ?
                            records.map((record, i) => {
                              return (
                                <div className="trade-record-item" key={i}>
                                  <a href={`https://dashboard.internetcomputer.org/transaction/${record.hash}`} target="blank" className=" record-flex">
                                    <div className="info-box">
                                      <i className="icon"></i>
                                      <div className="info">
                                        <p className="title">{record.from === user ? t('chome.send') : t('chome.receive')} {record.symbol}</p>
                                        <div className="txt">
                                          <p>{record.timestamp}</p>
                                          <p className="addr"> {record.from === user ? t('chome.receive') : t('chome.send')} {t('mhome.addr')}:{record.from === user ? addressSecret(record.to) : addressSecret(record.from)}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="record-right">
                                      <p className="money">{selfFixed((record.amount / 10 ** record.decimals), 4)}</p>
                                      {/* <p className="spread">+ $0.64</p> */}
                                    </div>
                                  </a>
                                </div>
                              )
                            })
                            :
                            <div className="auth-record-box">
                              <Empty />
                              <p className="no-txt">{t('chome.data_empty')}</p>
                            </div>
                        }
                        {records.length > 0 && <div className="trade-more"><a target="_blank" href={`https://dashboard.internetcomputer.org/account/${user}`}>{t('mhome.more')}</a></div>}
                        {isLoading && <Loading />}
                      </div>
                    ) : <AuthRecord />
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