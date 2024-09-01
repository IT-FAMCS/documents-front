import { Card, CardContent, Typography, Stack, Button } from "@mui/material";
import "@fontsource/jost";
import { GitHub, Telegram } from "@mui/icons-material";
import { TELEGRAM_PREFIX } from "../../constants/secondaryUrls";
import { CreatorsCard } from "../../interfaces/cardsInterfaces";

export const CreatorCard: React.FC<CreatorsCard> = ({
  name,
  surname,
  role,
  telegram,
  github,
}: CreatorsCard) => {
  const handleTelegramClick = () => {
    window.location.href = TELEGRAM_PREFIX + telegram;
  };

  const handleGithubClick = () => {
    window.location.href = github;
  };

  return (
    <Card
      sx={{
        width: 300,
      }}
    >
      <CardContent
        sx={{
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h5">{[name, surname].join(" ")}</Typography>
        <Typography variant="body1">{role}</Typography>
        <Stack direction={"row"} gap={10} justifyContent={"center"}>
          <Button variant="outlined" onClick={handleTelegramClick}>
            <Telegram />
          </Button>
          <Button variant="outlined" onClick={handleGithubClick}>
            <GitHub />
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
