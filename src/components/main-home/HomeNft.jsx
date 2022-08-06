import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import Empty from 'assets/images/zanwushuju.png'
export default function HomeNft() {
  const history = useHistory()
  const { t } = useTranslation();

  const [nftArr,setNftarr] = useState([])

  useEffect(()=>{
    const nftObjStr = localStorage.getItem('nftarr')
    const account = localStorage.getItem('user')

    if(nftObjStr){
      const nftObj = JSON.parse(nftObjStr)
      const currNft = nftObj.find(item => item.user === account)
      if(currNft){
        setNftarr(currNft.nftArr)
      }
    }
  },[])

  const handleAdd = () => {
    history.push('/addNft')
  }
  const toDetail = (e,cisternid) => {
    const account = localStorage.getItem('user')
    // history.push(`/nftDetail?cisternid=${cisternid}&user=${account}`)
    history.push({
      pathname: "/nftDetail",
      query:{ cisternid: cisternid, user: account }
    });
  }

  return (
    <>
      {
        nftArr.length > 0 ?
        (<div className="nft-list">
          {/* <img src={Empty} className="nft-no-data" />
          <p className="no-txt">{t('chome.data_empty')}</p> */}
          {
            nftArr.map(item => {
              return (
                <div className="nft-item" key={item.cisternId} onClick={(e)=>toDetail(e,item.cisternId)}>
                  <div className="nft-img">
                    <div className="img">
                      <img src={item.avatar} alt="" />
                    </div>
                    <p className="nft-name">{item.cisternId}</p>
                  </div>
                  <div className="nft-num">{item.num}个</div>
                </div>
              )
            })
          }
        </div>) : (
          <div className="nftarr-nodata">
            <img src={Empty} className="nft-no-data" />
            <p className="no-txt">{t('chome.data_empty')}</p>
          </div>
        )
      }
      <div className="nft-add-btn" onClick={()=>handleAdd()}>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="15" r="15" fill="#1BB16A"/>
          <rect x="8" y="14" width="14" height="2" rx="1" fill="white"/>
          <rect x="16" y="8" width="14" height="2" rx="1" transform="rotate(90 16 8)" fill="white"/>
        </svg>
      </div>
    </>
  )
}