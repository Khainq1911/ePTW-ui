import AbcIcon from "@mui/icons-material/Abc";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TableChartIcon from "@mui/icons-material/TableChart";
import ListIcon from "@mui/icons-material/List";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
export const columns = [
  {
    header: "Text",
    fields: [
      {
        type: "preFilledText",
        title: "Prefilled Text",
      },
      {
        type: "singleLineInput",
        title: "Single line text",
      },
      {
        type: "multipleLineInput",
        title: "Multiple line text",
      },
    ],
    icon: <AbcIcon />,
  },
  {
    header: "Date",
    fields: [
      {
        type: "date",
        title: "Date Picker",
      },
      {
        type: "dateRange",
        title: "Date Range Picker",
      },
    ],
    icon: <CalendarMonthIcon />,
  },
  {
    header: "Table",
    fields: [
      {
        type: "simpleTable",
        title: "Simple Table",
      },
      {
        type: "complexTable",
        title: "Complex Table",
      },
    ],
    icon: <TableChartIcon />,
  },
  {
    header: "List",
    fields: [
      {
        type: "bulletList",
        title: "Bullet List",
      },
      {
        type: "numberedList",
        title: "Numbered List",
      },
    ],
    icon: <ListIcon />,
  },
  {
    header: "Yes/No",
    fields: [
      {
        type: "yesNo",
        title: "Yes/No ",
      },
      {
        type: "yesNoNa",
        title: "Yes/No/NA ",
      },
    ],
    icon: <CheckBoxIcon />,
  },
];
