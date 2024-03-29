import XIcon from '@mui/icons-material/X';
import { Link } from 'react-router-dom';

export const ShareButton = ({url, fontSize}) => {
  // const URL = "https://map-demo-frontend.vercel.app/"
  return (
      <Link to={url} style={{color: "inherit", textDecoration: "none"}} target='_blank'>
        <XIcon variant={"contained"} fontSize={fontSize} />
      </Link>
  )
};