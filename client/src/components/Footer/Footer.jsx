import { Box, Link, Typography } from '@mui/material';
import './style.scss';

function Footer() {
    return <Box className='footer-container'>
        <Box className='about'>
            About us
        </Box>
        <Box className='social'>
            <Typography>
                Facebook
            </Typography>
            <Typography>
                Instagram
            </Typography>
            <Typography>
                Twitter
            </Typography>
        </Box>
        <Box className='contact'>
            <Typography>
                Mail: shophere@gmail.com
            </Typography>
            <Typography>
                Phone: 18003 24567
            </Typography>
        </Box>
    </Box>;
}

export default Footer;
