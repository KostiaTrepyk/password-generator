import React from "react";
import {
  Box,
  Button,
  Drawer,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  ArrowBackIosNew as ArrowBackIcon,
  SafetyCheck as SafetyCheckIcon,
} from "@mui/icons-material";
import { usePasswordContext } from "../contexts/PasswordContext/usePasswordContext";
import { type CharsType } from "../helpers/generatePassword";

interface SettingsMenuProps {
  open: boolean;
  onClose: () => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ open, onClose }) => {
  const {
    passwordLength,
    charsType,
    isSpecialChars,

    setPasswordLength,
    setCharsType,
    setIsSpecialChars,
    generateNewPassword,
  } = usePasswordContext();

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose} variant="persistent">
      <Button size="small" onClick={onClose} color="inherit" fullWidth>
        <ArrowBackIcon sx={{ rotate: "-90deg" }} />
      </Button>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          padding: "7dvh 0",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <Tooltip title="Generate password">
          <IconButton
            sx={{ height: 50, width: 50 }}
            onClick={generateNewPassword}
          >
            <SafetyCheckIcon />
          </IconButton>
        </Tooltip>

        <TextField
          variant="standard"
          label="Length"
          type="number"
          value={passwordLength}
          onChange={(e) => {
            const newValue = Number(e.currentTarget.value);

            if (newValue < 1 || newValue > 100) return;
            setPasswordLength(Number(e.currentTarget.value));
          }}
        />

        <Select
          variant="outlined"
          value={charsType}
          onChange={(e) => setCharsType(e.target.value as CharsType)}
        >
          <MenuItem value="alphabetic">Alphabetic</MenuItem>
          <MenuItem value="alphanumeric">Alphanumeric</MenuItem>
          <MenuItem value="numeric">Numeric</MenuItem>
        </Select>

        <FormControlLabel
          control={
            <Switch
              checked={isSpecialChars}
              onChange={(_, checked) => setIsSpecialChars(checked)}
            />
          }
          label="Special chars"
        />
      </Box>
    </Drawer>
  );
};

export default SettingsMenu;
