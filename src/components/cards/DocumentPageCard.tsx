import { useNavigate } from 'react-router-dom';
import '../../App.css';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import '@fontsource/jost';
import { DocumentsPageCard } from '../../interfaces/cardsInterfaces';

export const DocumentPageCard: React.FC<DocumentsPageCard> = ({ path, header, description }: DocumentsPageCard) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <Card variant="outlined" sx={{ width: 300, height: { xs: 50, md: 100, lg: 150 } }}>
      <CardActionArea onClick={handleClick}>
        <CardContent style={{ backgroundColor: '#d9d9d9' }} sx={{ minWidth: 300, minHeight: 150 }}>
          <Typography variant="h6" sx={{ mb: 3 }} fontFamily="Jost" fontWeight="700">
            {header}
          </Typography>
          <Typography variant="body1" fontFamily="Jost" fontSize="24" sx={{ display: { md: 'none', lg: 'block' } }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
