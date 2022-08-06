import { useState, useEffect, useImperativeHandle } from 'react'
import { useICPTransactionsCallback } from '@/hooks/useICPCalls'
import { useTranslation } from 'react-i18next';
import { addressSecret, selfFixed } from 'utils/utils'
import dayjs from "dayjs";
import Loading from 'components/loading'
import Empty from 'components/Empty'
const ICP_TRANSFER_TYPE_FORMAT = {
  TRANSACTION: "transfer",
}
export default function TradeRecord() {
  const { t } = useTranslation();
  const [records, setRecords] = useState([])
  const [user, setUser] = useState('')
  const icpTransactionsCallback = useICPTransactionsCallback();
  const [isLoading, setIsLoading] = useState(false)

  const getTransferList = async (address) => {
    setIsLoading(true)
    let list = [];
    const result = await icpTransactionsCallback(address);
    const _result = { ...result };
    let data = _result.transactions || [];
    data.map((item) => {
      console.log(item)
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
  )
}