
export default function Loading(props) {
  const { cls } = props
  return (
    <div className={`loading-wrap ${cls ? 'extr' : ''}`}>
      <div className="mask"></div>
      <div className="content">
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    </div>
  )
}