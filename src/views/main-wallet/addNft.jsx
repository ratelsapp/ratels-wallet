import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import MainHeader from 'components/header/MainHeader'
import { extNFTTokenActor } from 'utilActor/tokenActor'
import { tokenIdentifier } from 'utilActor/utils'

export default function AddNft() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { t } = useTranslation();
  
  const [cistern,setCistern] = useState('')
  const account = localStorage.getItem('user')
  const nftArr = localStorage.getItem('nftarr')

  useEffect(() => {
    
  },[])

  const cisternChange = (e) => {
    const value = e.target.value 
    setCistern(value)
  }

  const handleAddAddr = async () => {
    try {
      let actor = await extNFTTokenActor(cistern, 'https://boundary.ic0.app');

      
      const arr = await actor.tokens_ext(account)

      let obj = {
        num:0,
        cisternId:cistern,
        nfts:[],
        avatar:''
      }
      console.log(arr.ok)
      if(Array.isArray(arr.ok)){
        obj.num = arr.ok.length
        arr.ok.forEach(item => {
          const tokenid = tokenIdentifier(cistern, item[0])
          obj.avatar = `https://${cistern}.raw.ic0.app/?type=thumbnail&tokenid=${tokenid}`
          obj.nfts.push({
            index:item[0],
            avatar:`https://${cistern}.raw.ic0.app/?type=thumbnail&tokenid=${tokenid}`
          })
        })
      }

      if(!nftArr){
        const nftObj = [{
          user:account,
          nftArr:[obj]
        }]
        localStorage.setItem('nftarr',JSON.stringify(nftObj))
        history.push('/tabHome')
      }else{
        let nftObj = JSON.parse(nftArr)
        const currNft = nftObj.find(item => item.user === account)
        if(currNft){
          const has = currNft.nftArr.find(item => item.cisternId == cistern)
          if(has){
          }else{
            currNft.nftArr.push(obj)
            localStorage.setItem('nftarr',JSON.stringify(nftObj))
            history.push('/tabHome')
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="tab-common-page">
      <div className="upper-lower-structure">
        <MainHeader onUserChange={(v) => handleUserChange(v)} />
        <div className="sturcture-center-setup">
          <div className="setup-center-scroll">
            <div className="nft-form">
              <div className="nft-form-item">
                <select>
                  <option value="0">Ratels,ICPSwap - Ed25519Key</option>
                  <option value="1">Plug - Secpk256k1</option>
                  <option value="2">Stoic - Ed25519Key</option>
                </select>
              </div>
              <div className="nft-form-item">
                <input type="text" placeholder='输入容器ID' onChange={(e) => cisternChange(e)} />
              </div>
            </div>
            <div className="addr-btn">
                <button className="comm-btn__fill increase" onClick={(e) => handleAddAddr()}>确认添加</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}