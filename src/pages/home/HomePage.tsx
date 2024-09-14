import { Stack } from '@mui/material';
import { DocumentPageCard } from '../../components/cards/DocumentPageCard';
import { documentTypes } from '../../constants/documentTypes';

export const HomePage = () => {
  return (
    <Stack
      margin={'auto'}
      useFlexGap
      width={'50%'}
      flexDirection={'row'}
      alignItems={'center'}
      gap={{ sm: 0, md: 5, lg: 15 }}
      flexWrap={'wrap'}
      justifyContent={'space-between'}
      height={'calc(100vh - 120px)'}
    >
      {documentTypes.map((card) => {
        return <DocumentPageCard path={card.path} header={card.header} description={card.description} />;
      })}
    </Stack>
  );
};
