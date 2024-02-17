import axios from "axios";
import { useQuery } from "react-query";
import { Navigation, Pagination,  Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../categories/Categories.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Link } from "react-router-dom";


export default function Categories() {
  const getCategories = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=8`);
    return data;
  };

  
  const { data, isLoading } = useQuery("web_categories", getCategories);
  // console.log(data?.categories);

  if (isLoading) {
    return <p>...loading</p>;
  }

  return (
    <div className="container mt-5">
      {/* <div className="row">
        {data?.categories.length
          ? data?.categories.map((category) => (
              <div className="col-lg-3" key={category._id}>
                <img src={category.image.secure_url} />
                <h2>{category.name}</h2>
              </div>
            ))
          : "<h2>no category found</h2>"}
      </div> */}

<div className="swiper-custom-pagination"></div>
<Swiper
  modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={10}
      slidesPerView={6}
      navigation
      loop={true}
      autoplay={{
        delay: 3000,
      }}
      pagination={{
         clickable: true,
        e1: '.swiper-custom-pagination'
        }}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}

    >
       {data?.categories.length
          ? data?.categories.map((category) =>
          <SwiperSlide key={category._id}>
           
            <Link to={`/products/category/${category._id}`}>
              <div className="category">
              <img src={category.image.secure_url} className="rounded-circule" ></img>

              </div>

            </Link>
            </SwiperSlide>
          )
          : "<h2>no category found</h2>"}
      
    
    </Swiper>

  
    </div>
  );
}
