import { Box } from '@mui/material';
import CategoryCard from '../CategoryCard/CategoryCard';
import './style.scss';
import image1 from './images/1.png';
import image2 from './images/2.png';
import image3 from './images/3.png';
import image4 from './images/4.png';
import image5 from './images/5.png';
import image6 from './images/6.png';
import { useNavigate } from 'react-router-dom';


function Category() {
    const navigate = useNavigate();
    return <Box className='category-card'>
        <Box className="sub-category">
            <CategoryCard onClick={() => { navigate('/products/shirts') }} category="MEN SHIRTS" image={image1} />
            <CategoryCard onClick={() => { navigate('/products/trousers') }} category="MEN TROUSERS" image={image2} />
            <CategoryCard onClick={() => { navigate('/products/shoes') }} category="MEN FOOT WEAR" image={image3} />
        </Box>
        <Box className="sub-category">
            <CategoryCard onClick={() => { navigate('/products/tops') }} category="WOMEN TOPS" image={image4} />
            <CategoryCard onClick={() => { navigate('/products/trousers') }} category="WOMEN TROUSERS" image={image5} />
            <CategoryCard onClick={() => { navigate('/products/shoes') }} category="WOMEN FOOT WEAR" image={image6} />
        </Box>

    </Box>;
}

export default Category;
