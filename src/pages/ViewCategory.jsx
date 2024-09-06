import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Card, CardMedia, CardContent, Typography, Box, Button, Pagination, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useFetchByCateIdQuery } from '../services/productApi';
import { useFetchCategoryByIdQuery } from '../services/categoryApi';

const ViewCategory = () => {

    const [page, setPage] = useState(1);
    const itemsPerPage = 12;

    const handlePageChange = (_, value) => {
        setPage(value);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const { id } = useParams();
    const { data: response, isLoading: isCateLoading } = useFetchCategoryByIdQuery(id);
    const category = response?.data || {};

    const { data: response2, isLoading } = useFetchByCateIdQuery({
        page,
        limmit: itemsPerPage,
        id
    })

    const products = response2?.data?.products || [];
    const totalPages = response2?.data?.pagination.pages || 0;

    return (
        <Container maxWidth="xl">
            {isCateLoading ? (
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', my: 3, bgcolor: '#fff', py: 3, px: { xs: 1, sm: 3 }, boxShadow: 1, borderRadius: 2 }}>
                    <div className='p-2'>
                        <Skeleton sx={{ mr: { xs: 0, sm: 2 } }} variant="circle" width='120px' height='120px' />
                        <Skeleton variant="text" sx={{ mt: 1 }} />
                    </div>
                    <div className='flex flex-col w-full'>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton key={index} width='100%' sx={{ ml: { xs: 0, sm: 2 } }} variant="text" />
                        ))}
                    </div>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', my: 3, bgcolor: '#fff', py: 3, px: { xs: 1, sm: 3 }, boxShadow: 1, borderRadius: 2 }}>
                    <div className='flex items-center justify-center flex-col sm:me-3'>
                        <img src={category.image} alt={category.title} className='w-28 h-28 md:w-32 md:h-32' />
                        <h3 className='md:text-lg text-base mt-3 font-semibold'>{category.title}</h3>
                    </div>
                    <Typography variant="body1" sx={{ py: 2, px: { xs: 1, sm: 2 }, ml: { xs: 0, sm: 4 }, fontSize: { sm: '16px', xs: '14px' } }} dangerouslySetInnerHTML={{ __html: category.description }} />
                </Box>
            )}
            <Box className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-8">
                {isLoading ? (
                    Array.from({ length: 10 }).map((_, index) => (
                        <Card
                            key={index}
                            className="max-w-sm mx-auto"
                            sx={{ width: { xs: '100%', sm: '80%', md: '90%', lg: '100%' }, margin: 'auto' }}
                        >
                            <Skeleton
                                variant="rectangular"
                                sx={{
                                    width: { xs: '100%', sm: 230 },
                                    height: { xs: 170, sm: 230 },
                                    mx: 'auto',
                                }}
                            />
                            <CardContent>
                                <Skeleton variant="text" />
                                <Skeleton variant="text" width="60%" />
                                <Skeleton variant="rectangular" height={36} width="100%" sx={{ mt: 2 }} />
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    products.map((product) => (
                        <Card
                            key={product._id}
                            className="max-w-sm mx-auto"
                            sx={{ width: { xs: '100%', sm: '80%', md: '90%', lg: '100%' }, margin: 'auto' }}
                        >
                            <CardMedia
                                component="img"
                                image={product.image}
                                alt={product.title}
                                sx={{ width: 230, height: { xs: 170, sm: 230 }, objectFit: 'cover', margin: '0 auto' }}
                            />
                            <CardContent>
                                <Typography
                                    sx={{
                                        fontWeight: 500,
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        WebkitLineClamp: 2,
                                        maxHeight: '3.2em',
                                        my: 1,
                                        fontSize: { xs: '0.8rem', sm: '1rem' },
                                    }}
                                >
                                    {product.title}
                                </Typography>
                                <Typography variant="body1" sx={{ marginBottom: 2 }}>${product.price}</Typography>
                                <Link to={`/product/${product._id}`}>
                                    <Button variant="contained" color="primary">Buy Now</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))
                )}
            </Box>
            <Box className="flex justify-center mt-4">
                {!isLoading && totalPages > 1 && (
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                )}
            </Box>
        </Container>
    )
}

export default ViewCategory