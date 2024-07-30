import React from 'react'
import Banner from '../components/Banner'
import { Container } from '@mui/material'
import FeaturedProducts from '../components/featuredProducts'
import PopularCategories from '../components/popularCategory'

function Home() {
  return (
    <>
      <Banner />
      <Container maxWidth="xl">
        <FeaturedProducts />
        <PopularCategories />
        <div>
          
        </div>
      </Container>
    </>
  )
}

export default Home