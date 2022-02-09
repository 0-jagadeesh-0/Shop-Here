import { Box } from '@mui/material';
import CategoryCard from '../CategoryCard/CategoryCard';
import './style.scss';

function Category() {
    return <Box className='category-card'>
        <CategoryCard />
    </Box>;
}

export default Category;
