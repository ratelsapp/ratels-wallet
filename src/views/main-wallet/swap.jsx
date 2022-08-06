import MainHeader from 'components/header/MainHeader'
import TabBar from 'components/tabbar'

import pageBg from 'assets/images/swap-page.png'
export default function Swap() {
  const handleUserChange = (v) => {
    console.log(v)
  }
  return (
    <div className="tab-common-page">
      <div className="upper-lower-structure">
        <MainHeader leftType='menu' onUserChange={(v) => handleUserChange(v)} />
        <div className="sturcture-center">
          <div className="swap-page">
            <div className="swap-cont">
              <img src={pageBg} alt="" />
              <div className="swap-txt">
                <p>Future Token Swaps on the IC</p>
              </div>
            </div>
          </div>
        </div>
        <TabBar />
      </div>
    </div>
  )
}