import MainHeader from 'components/header/MainHeader'
export default function AboutUs() {
  return (
    <div className="tab-common-page">
      <div className="upper-lower-structure">
        <MainHeader onUserChange={(v) => handleUserChange(v)} />
        <div className="sturcture-center-setup">
          <div className="setup-center-scroll">
            <section className="sectiion-wrap">
              <p className="section-title">About Us</p>
              <div className="section-text">
                <p>Ratels is the most personalized crypto wallet on the Internet Computer. It is committed to becoming the most daring breakthrough and most innovative crypto wallet on the Internet Computer, creating a new gateway that makes your wallet management,  asset management, exchange, safer and more convenient.</p>
              </div>
            </section>
            <section className="sectiion-wrap">
              <p className="section-title">Contact Us</p>
              <div className="section-text">
                <p>ratelswallet@gmail.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}