import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import MainHeader from 'components/header/MainHeader'
import { addressSecret } from 'utils/utils'

export default function AddNft(props) {
  const history = useHistory()
  const dispatch = useDispatch()
  const { t } = useTranslation();
  
  const [nfts,setNfts] = useState([])

  

  useEffect(() => {
    const { query } = props.location
    const account = localStorage.getItem('user')
    const nftObjStr = localStorage.getItem('nftarr')
    if(nftObjStr){
      const nftObj = JSON.parse(nftObjStr)

      const currNft = nftObj.find(item => item.user === account)
      if(currNft){
        const cisternObj = currNft.nftArr.find(iten => iten.cisternId === query.cisternid)

        console.log(cisternObj)
        if(cisternObj){
          setNfts(cisternObj.nfts)
        }
      }
    }
  },[])


  const handleAddAddr = async () => {
  }
  return (
    <div className="tab-common-page">
      <div className="upper-lower-structure">
        <MainHeader onUserChange={(v) => handleUserChange(v)} />
        <div className="nft-detail-content">
          <div className="nft-detail-intro">
            <div className="intro-head">
              <div className="avatar"></div>
              <div className="head-info">
                <p className="name"></p>
                <p className="addr">{addressSecret('kfljkw97wehfkwef7whklnv')}</p>
              </div>
            </div>
            <div className="intro-text">
              <p></p>
            </div>
          </div>
          <p className="nft-list-title">NFT列表</p>
          <div className="nft-detail-list">
            <div className="detail-list-box">
              {
                nfts.map(item => {
                  return (
                    <div className="list-item" key={item.index}>
                      <div className="itm-img">
                        <img src={item.avatar} alt="" />
                      </div>
                      <div className="itm-info">
                        <p className="name">{item.index}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="group-button-two">
            <button className="comm-btn__rect" onClick={(e) => handleAddAddr()}>接收</button>
            <button className="comm-btn__fill" onClick={(e) => handleAddAddr()}>发送</button>
          </div>
        </div>
      </div>
    </div>
  )
}