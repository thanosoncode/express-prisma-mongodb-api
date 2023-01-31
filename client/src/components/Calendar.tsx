import { ExpandMore, NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";

const monthName = (month: number) => {
  switch (month) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";

    default:
      break;
  }
};

const Calendar = () => {
  const [month, setMonth] = useState<number>(2);
  const [year, setYear] = useState(2023);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getWhatDayIsTheFirst = (year: number, month: number) => {
    return new Date(year, month - 1, 1).toString().split(" ")[0];
  };

  const getHowManyEmptiesBasedOnWhatDayIsFirst = (day: string) => {
    switch (day) {
      case "Sun":
        return 0;
      case "Mon":
        return 1;
      case "Tue":
        return 2;
      case "Wed":
        return 3;
      case "Thu":
        return 4;
      case "Fri":
        return 5;
      case "Sat":
        return 6;
      default:
        return 0;
    }
  };

  const handlePreviousMonth = () => {
    if (month >= 2) {
      setMonth((m) => m - 1);
      return;
    }
    setMonth(12);
  };

  const handleNextMonth = () => {
    if (month < 12) {
      setMonth((m) => m + 1);
      return;
    }
    setMonth(1);
  };

  const openYearOptions = () => {};

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          {monthName(month)} {year}{" "}
          <IconButton onClick={openYearOptions}>
            <ExpandMore />
          </IconButton>
        </div>
        <div>
          <IconButton onClick={handlePreviousMonth}>
            <NavigateBefore />
          </IconButton>
          <IconButton onClick={handleNextMonth}>
            <NavigateNext />
          </IconButton>
        </div>
      </Box>
      <div
        style={{
          display: "grid",
          backgroundColor: "#dadada",
          gridTemplateColumns: "repeat(7,50px)",
          gridTemplateRows: "repeat(6,50px)",
        }}
      >
        <span>S</span>
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>
        {new Array(
          getHowManyEmptiesBasedOnWhatDayIsFirst(
            getWhatDayIsTheFirst(year, month)
          )
        )
          .fill(null)
          .map((_, index) => (
            <span key={index}></span>
          ))}
        {new Array(getDaysInMonth(year, month)).fill(null).map((_, index) => (
          <span key={index + 1}>{index + 1}</span>
        ))}
      </div>
    </div>
  );
};
export default Calendar;
