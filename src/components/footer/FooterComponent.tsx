import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import "../../components/footer/Footer.css";
import { useNavigate } from "react-router-dom";

export const FooterComponent = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/creators");
  };

  return (
    <footer className="footer-component">
      <Stack
        padding={"10px"}
        alignItems="center"
        justifyContent="center"
        direction={"column"}
        spacing={2}
      >
        <Button id="creators" variant="outlined" onClick={handleButtonClick}>
          О создателях
        </Button>
      </Stack>
    </footer>
  );
};
