
import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
function CategoriesDetails() {

    // console.log(useParams());
    const {categoryId} = useParams();
    // console.log(categoryId);

    const getCategoryDetails = async () => {
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`);
        return data.products;

    }

    // الداتا الي راجعة من الفنكشن الي فوق بتتخزن بالداتا الي تحت

    const {data, isLoading} = useQuery('category_details',getCategoryDetails);
    
    // هاي مثلا رح تطبع معلومات المنتجات products
    // console.log(data);

    if (isLoading) {
        return <p>loading...</p>
    }


  return (
    // <div>Categories Details</div>

    <div className='products'>
        {data.length? data.map(product => 

        <div className='product' key={product._id}>
            <img src={product.mainImage.secure_url}></img>
            <h2>{product.name}</h2>
            <Link to={`/product/${product._id}`}>product details</Link>
        </div>): <h2>no product</h2>}

    </div>
  )
}

export default CategoriesDetails