import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import MainHeader from 'components/header/MainHeader'

import Svgthree from 'components/svgs/Svgthree'

import './index.css'
export default function AddrStep2() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { t } = useTranslation();


  const [addr_label,setAddr] = useState('')
  const [account,setAccount] = useState('')

  const user = localStorage.getItem('user')

  const attrEnum = {
    'addr_label': setAddr,
    'account': setAccount
  }

  const handleChange = (event, attr) => {
    attrEnum[attr](event.target.value)
  }

  const handleAddConfirm = () => {
    console.log(addr_label,account,user)
    const addr_books = localStorage.getItem('addrBooks')
    if(addr_books){
      const booksArr = JSON.parse(addr_books)
      booksArr.push({
        user:user,
        address:account,
        addrLabel:addr_label
      })
      localStorage.setItem('addrBooks',JSON.stringify(booksArr))
    }else{
      const books = [
        {
          user:user,
          address:account,
          addrLabel:addr_label
        }
      ]
      localStorage.setItem('addrBooks',JSON.stringify(books))
    }
    history.goBack()
  }
  return (
    <div className="tab-common-page">
      <div className="upper-lower-structure">
        <MainHeader onUserChange={(v) => handleUserChange(v)} />
        <div className="sturcture-center-setup">
          <div className="setup-center-scroll">
            <div className="decorate-img register-decorate">
              {/* <img src={bg1} alt="" /> */}
              <Svgthree />
            </div>
            <div className="card-wrap register-form">
              <div className="form-wrap">
                <div className="form-item">
                  <p className="name"></p>
                  <div className="iput">
                    <input type="text" value={addr_label} onChange={(e) => handleChange(e, 'addr_label')} placeholder='输入标签' />
                  </div>
                </div>
                <div className="form-item">
                  <p className="name"></p>
                  <div className="iput">
                    <input type="text" value={account} onChange={(e) => handleChange(e, 'account')} placeholder='输入地址' />
                  </div>
                </div>
              </div>
            </div>
            <div className="addr-btn">
              <button className="comm-btn__fill increase" onClick={(e) => handleAddConfirm()}>确认</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}