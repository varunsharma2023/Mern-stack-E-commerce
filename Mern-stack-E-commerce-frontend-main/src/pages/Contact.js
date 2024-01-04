import React from 'react'
import Layout from '../components/Layout'

const Contact = () => {
  return (
    <Layout>

<div>
  <div className="contain w-100 cover sticky-lg-top">
    <header id="container">
    </header>
  </div>
  <main className="container s">
    <div className="row tex">
      <div className="col-12  ">
      </div>
      <h3 className=" heading text-center mb-5 mt-5">Contact us</h3></div>
    {/* image container */}
    <div className="row logo-image mb-3">
      <div className="logo-img col-12 col-lg-12 col-md-12 col-sm-12 mt-4 d-flex justify-content-center">
      <img src={require("../../src/images/e-logo.png")} alt="E-shopping" className="logo" width={400} height={200} />
      </div>
      {/* form container */}
     <div className='my-3'>
        <h4 className='text-center'> You can reach us via mail "eshopping@shop.com</h4>
        <hr/>
        <h4 className='text-center'>OR</h4>
        <h3 className='text-center'> Contact us - +01 9999999999</h3>
        </div>
    </div>
  </main>
</div>

    </Layout>
  )
}

export default Contact