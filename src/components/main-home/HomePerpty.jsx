
export default function HomePerpty(props) {
  const { balance, worth, symbolType, isLoading } = props
  return (
    <div className="currency-list">
      <div className="currency-item">
        <div className="item-l">
          <i className="currency-icon"></i>
          <div className="info">
            <p className="name">{symbolType}</p>
            <p className="num">Internet Computer Protocol</p>
          </div>
        </div>
        <div className="item-r">
          {
            isLoading ? <span className="local-loading"></span> : (
              <>
                <p className="money">{balance}</p>
                <p className="sub add">{worth}</p>
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}