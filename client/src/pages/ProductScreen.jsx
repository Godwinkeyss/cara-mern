import { useState, useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Product from '../components/Product';
import { Store } from '../Store';
import { getError } from '../utils';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, product: action.payload.product, relatedProducts: action.payload.relatedProducts };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductScreen = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const [{ loading, product, relatedProducts, error }, dispatch] = useReducer(reducer, {
    product: {},
    relatedProducts: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(`/api/products/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        setMainImage(data.product.images[0]);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [slug]);

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCart = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const newQuantity = existItem ? existItem.quantity + 1 : quantity;

    const { data } = await axios.get(`/api/products/id/${product._id}`);
    if (data.countInStock < newQuantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }

    ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity: newQuantity } });
    navigate('/cart');
  };
  useEffect(() => {
    // Scroll to the top when the component is mounted
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this runs only once when the page loads


  return (
    <>
      {loading ? (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingBox />
        </div>
      ) : error ? (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <MessageBox variant="danger">{error}</MessageBox>
</div>
      ) : (
        <div className="product-screen section-p1">
          <div className="product-screen-left">
            <img src={mainImage} alt={product.name} className="product-large-img" />
            <div className="small-images">
              {product.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="thumbnail"
                  onClick={() => handleThumbnailClick(image)}
                />
              ))}
            </div>
          </div>
          <div className="product-screen-right">
            <h6>{product.category}</h6>
            <h2>{product.name}</h2>
            <h3>£{product.price}</h3>
            <div className="select-size">
              <select>
                <option>Select Size</option>
                <option>SM</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
                <option>XXL</option>
              </select>
            </div>
            <div className="quantity-cart">
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <button onClick={addToCart}>Add To Cart</button>
            </div>
            <h4>Product Details</h4>
            <p>{product.description}</p>
          </div>
        </div>
      )}

      <section id="feature-products" className="section-p1">
        <h1>Related Products</h1>
        <p>Summer Collection New Modern Design</p>
        <div className="products">
          {relatedProducts.map((p) => (
            <Product key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductScreen;
