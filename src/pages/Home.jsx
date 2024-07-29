import React from 'react'
import Banner from '../components/Banner'
import { Container } from '@mui/material'
import FeaturedProducts from '../components/featuredProducts'

function Home() {
  return (
    <>
      <Banner />
      <Container maxWidth="xl">
        <FeaturedProducts />
      </Container>
    </>
  )
}

export default Home