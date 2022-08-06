import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import MainHeader from 'components/header/MainHeader'
import Empty from 'components/Empty'

export default function AddrManage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { t } = useTranslation();
  
  const [addr_books,setBooks] = useState([])

  useEffect(() => {
    const addrBooks = localStorage.getItem('addrBooks')
    if(addrBooks){
      setBooks(JSON.parse(addrBooks))
    }
  },[])

  const handleAddAddr = () => {
    history.push('/addrStep2')
  }
  return (
    <div className="tab-common-page">
      <div className="upper-lower-structure">
        <MainHeader onUserChange={(v) => handleUserChange(v)} />
        <div className="sturcture-center-setup">
          <div className="setup-center-scroll">
            {
              addr_books.length > 0 ? 
              (
                <div className="wallet-list">
                  <div className="list-cc">
                    {
                      addr_books.map(item => {
                        return (
                          <div className="addr-item" key={item.address}>
                            <p className="name">{item.addrLabel}</p>
                            <p className="account">{item.address}</p>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              ) : <Empty />
            }
            <div className="addr-btn">
                <button className="comm-btn__fill increase" onClick={(e) => handleAddAddr()}>添加地址</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}