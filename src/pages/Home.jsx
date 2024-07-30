import React from 'react'
import Banner from '../components/Banner'
import { Container, Divider } from '@mui/material'
import FeaturedProducts from '../components/featuredProducts'
import PopularCategories from '../components/popularCategory'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import s1 from '../assets/service_img/delivery.svg'
import s2 from '../assets/service_img/payment.svg'
import s3 from '../assets/service_img/moneyback.svg'
import s4 from '../assets/service_img/support.svg'

function Home() {
  return (
    <>
      <Banner />
      <Container maxWidth="xl">
        <FeaturedProducts />
        <PopularCategories />
        <div className='service flex flex-wrap lg:flex-nowrap mb-4 mt-8 sm:mt-24 justify-center'>
          <div className='flex flex-col items-center justify-center px-6 lg:py-0 py-5'>
            <img src={s1} alt="" />
            <h5>Fast & Free Delivery</h5>
            <p>
              Worldwide delivery available on all orders
            </p>
          </div>
          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', lg: 'flex' } }} />
          <div className='flex flex-col items-center justify-center px-6 lg:py-0 py-5'>
            <img src={s2} alt="" />
            <h5>Secure Payment</h5>
            <p>
              Payments made easy expertly and secured
            </p>
          </div>
          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', lg: 'flex' } }} />
          <div className='flex flex-col items-center justify-center px-6 lg:py-0 py-5'>
            <img src={s3} alt="" />
            <h5>Money Back Guarantee</h5>
            <p>
              100% money back. If you're not satisfied
            </p>
          </div>
          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', lg: 'flex' } }} />
          <div className='flex flex-col items-center justify-center px-6 lg:py-0 py-5'>
            <img src={s4} alt="" />
            <h5>Online Support</h5>
            <p>
              Dedicated team for remote support 24/7
            </p>
          </div>
        </div>
        <Newsletter />
      </Container>
      <Footer />
    </>
  )
}

export default Home