import { useState } from "react";
import { Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

const MainPage = () => {
  const [value, setValue] = useState(null);
  return (
    <div className="container">
      <div className="titleWrap">
        <p className="title">Set Security Strategy</p>
      </div>
      <div className="contents">
        <div className="lstTab">
          <div>Mission & Vision</div>
          <div>Strategic Business Objectives</div>
        </div>
        <div className="contentWrap">
          <div className="card">
            <div className="cardWrap">
              <div className="cardLeft">
                <div className="cardContent">
                  <div className="title">Objective1</div>
                  <input type="text" />
                </div>
                <div className="cardContent">
                  <div className="titleBox">
                    <p className="title">Key Measures</p>
                    <div className="subTitleWrap">
                      <p className="subTitle">Add additional key measure</p>
                      <AddCircleIcon
                        style={{
                          color: "#25397d",
                          fontSize: "18px",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="inputWrap">
                    <input type="text" />
                    <RemoveCircleIcon
                      style={{
                        color: "#e03345",
                        fontSize: "18px",
                        cursor: "pointer",
                        marginLeft: "10px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="cardRight">
                <div className="startDate">
                  <div className="title">Start Date</div>
                  <div className="datePicker">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        slotProps={{ textField: { size: "small" } }}
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="endDate">
                  <div className="title">End Date</div>
                  <div className="datePicker">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        slotProps={{
                          textField: { size: "small" },
                        }}
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
            </div>
            <div className="btnWrap">
              <Button className="delBtn" variant="outlined">
                Delete
              </Button>
              <Button className="updateBtn">Update</Button>
            </div>
          </div>
          <div className="addBtnWrap">
            <Button className="addBtn">
              <AddCircleIcon
                style={{
                  color: "#fff",
                  fontSize: "18px",
                  cursor: "pointer",
                  marginRight: "5px",
                }}
              />
              Add Objective
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
