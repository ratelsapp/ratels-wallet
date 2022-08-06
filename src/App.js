import {HashRouter,Route,Switch,Redirect} from 'react-router-dom'

import '@/style/base.css'
import '@/style/common.css'
import '@/style/index.css'

import * as wallet from '@/views/increase-wallet'
import * as main from '@/views/main-wallet'
import * as setup from '@/views/setup-wallet'

function App() {
  
  return (
    <div className="content-wrapper">
      <HashRouter>
        <Switch>
          <Route path="/" exact render={() => <Redirect to='/tabHome' />} />
          <Route path="/index" exact component={wallet.Home} />
          <Route path="/register" exact component={wallet.Register} />
          <Route path="/words" exact component={wallet.Words} />
          <Route path="/wordsValidate" exact component={wallet.ValidateWords} />
          <Route path="/walletSucc" exact component={wallet.WalletSuccess} />
          <Route path="/setPwd" exact component={wallet.SetPwd} />
          <Route path="/increase" exact component={wallet.Increase} />
          <Route path="/tabHome" exact component={main.Home} />
          <Route path="/deposit" exact component={main.Deposit} />
          <Route path="/setting" exact component={main.Setting} />
          <Route path="/record" exact component={main.Record} />
          <Route path="/send" exact component={main.Send} />
          <Route path="/confirmSend" exact component={main.SendConfirm} />
          <Route path="/swap" exact component={main.Swap} />
          <Route path="/addNft" exact component={main.AddNft} />
          <Route path="/nftDetail" exact component={main.NftDetail} />
          <Route path="/walletManage" exact component={setup.WalletManage} />
          <Route path="/WalletExport" exact component={setup.WalletExport} />
          <Route path="/aboutUs" exact component={setup.AboutUs} />
          <Route path="/addrManage" exact component={setup.AddrManage} />
          <Route path="/addrStep2" exact component={setup.AddrStep2} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
