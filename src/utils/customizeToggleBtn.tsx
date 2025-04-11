import {
  styled,
  ToggleButtonGroup,
  toggleButtonGroupClasses,
  toggleButtonClasses,
} from "@mui/material";

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
    border: "none",
    borderRadius: theme.shape.borderRadius,
    padding: "4px 12px",
    backgroundColor: theme.palette.grey[200], 
    color: theme.palette.text.primary,
    transition: "background-color 0.3s",

    [`&.${toggleButtonClasses.selected}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },

    [`&:hover`]: {
      backgroundColor: theme.palette.grey[300],
    },

    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: `1px solid ${theme.palette.divider}`,
    },
  },

  [`& .${toggleButtonGroupClasses.middleButton}, & .${toggleButtonGroupClasses.lastButton}`]: {
    marginLeft: -1,
    borderLeft: "1px solid transparent",
  },
}));
