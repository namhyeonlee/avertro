import { useState } from "react";
import TabList from "components/common/TabList";
import DatePickerInput from "components/common/DatePickerInput";
import { doGetByteLength, toastCall } from "utils/commonFunction";
import { Button } from "@mui/material";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

interface IObjective {
  id: number;
  objective: string;
  keyMeasures: IKeyMeasure[];
  startDate: string;
  endDate: string;
}

interface IKeyMeasure {
  id: number;
  value: string;
}

const initKeyMeasure: IKeyMeasure = {
  id: 1,
  value: "",
};

const initObjective: IObjective = {
  id: 1,
  objective: "",
  keyMeasures: [initKeyMeasure],
  startDate: "",
  endDate: "",
};

const MAX_OBJECTIVE = 3;
const ERROR_MSG = "Invalid Date";

const MainPage = () => {
  const [lstObjective, setLstObjective] = useState<IObjective[]>([initObjective]);

  const doAddObjective = () => {
    if (lstObjective.length === MAX_OBJECTIVE) {
      toastCall("You can add up to three maximum.", "warning");
    } else {
      setLstObjective([...lstObjective, { ...initObjective, id: lstObjective.length + 1 }]);
    }
  };

  const doAddKeyMeasures = (id: number, length: number) => {
    if (length === MAX_OBJECTIVE) {
      toastCall("You can add up to three maximum.", "warning");
    } else {
      setLstObjective(
        lstObjective.map((obj) =>
          obj.id === id
            ? {
                ...obj,
                keyMeasures: [...obj.keyMeasures, { ...initKeyMeasure, id: length + 1 }],
              }
            : obj
        )
      );
    }
  };

  const onChangeValue = (id: number, key: string, value: string) => {
    setLstObjective(lstObjective.map((obj) => (obj.id === id ? { ...obj, [key]: value } : obj)));
  };

  const doUpdateObjective = (obj: IObjective) => {
    if (!doVaildation(obj)) return;

    toastCall("Update successful", "success");
    localStorage.setItem(`obj${obj.id}`, JSON.stringify(obj));
  };

  const doVaildation = (obj: IObjective) => {
    if (doGetByteLength(obj.objective) > 20) {
      toastCall("You cannot exceed 20 characters.", "error");
      return false;
    }
    for (let i = 0; i < obj.keyMeasures.length; i++) {
      if (doGetByteLength(obj.keyMeasures[i].value) > 20) {
        toastCall("You cannot exceed 20 characters.", "error");
        return false;
      }
    }
    if (!obj.startDate || obj.startDate === ERROR_MSG) {
      toastCall("Please enter the starting date.", "error");
      return false;
    }
    if (!obj.endDate || obj.startDate === ERROR_MSG) {
      toastCall("Please enter the end date.", "error");
      return false;
    }
    if (Number(obj.startDate) > Number(obj.endDate)) {
      toastCall("Please verify the start date and end date.", "error");
      return false;
    }
    return true;
  };

  return (
    <div className="container">
      <div className="titleWrap">
        <p className="title">Set Security Strategy</p>
      </div>
      <div className="contents">
        <TabList titles={["Mission & Vision", "Strategic Business Objectives"]}>
          <div className="contentWrap">Mission & Vision</div>
          <div className="contentWrap">
            {lstObjective.map((rowData, i) => (
              <div key={`card${i}`} className="card">
                <div className="cardWrap">
                  <div className="cardLeft">
                    <div className="cardContent">
                      <div className="title">Objective{i + 1}</div>
                      <input type="text" value={rowData.objective} onChange={(e) => onChangeValue(rowData.id, "objective", e.target.value)} />
                    </div>
                    <div className="cardContent">
                      <div className="titleBox">
                        <p className="title">Key Measures</p>
                        <div className="subTitleWrap">
                          <p className="subTitle">Add additional key measure</p>

                          <a onClick={() => doAddKeyMeasures(rowData.id, rowData.keyMeasures.length)}>
                            <AddCircleIcon style={{ color: "#25397d", fontSize: "18px", cursor: "pointer", marginLeft: "5px" }} />
                          </a>
                        </div>
                      </div>
                      {rowData.keyMeasures.map((keyMeasure, i) => (
                        <div key={`input${i}`} className="inputWrap">
                          <input
                            type="text"
                            value={keyMeasure.value}
                            onChange={(e) =>
                              setLstObjective(
                                lstObjective.map((obj) =>
                                  obj.id === rowData.id
                                    ? {
                                        ...obj,
                                        keyMeasures: obj.keyMeasures.map((key) => (key.id === keyMeasure.id ? { ...key, value: e.target.value } : key)),
                                      }
                                    : obj
                                )
                              )
                            }
                          />
                          {rowData.keyMeasures.length - 1 !== i && (
                            <a
                              className="removeIcon"
                              onClick={() =>
                                setLstObjective(
                                  lstObjective.map((obj) =>
                                    obj.id === rowData.id
                                      ? {
                                          ...obj,
                                          keyMeasures: obj.keyMeasures.filter((key) => key.id !== keyMeasure.id).map((data, i) => ({ ...data, id: i + 1 })),
                                        }
                                      : obj
                                  )
                                )
                              }
                            >
                              <RemoveCircleIcon style={{ color: "#e03345", fontSize: "18px", cursor: "pointer", marginLeft: "10px" }} />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="cardRight">
                    <div className="startDate">
                      <div className="title">Start Date</div>
                      <DatePickerInput date={rowData.startDate} maxDate={rowData.endDate} onChange={(date) => onChangeValue(rowData.id, "startDate", date)} />
                    </div>
                    <div className="endDate">
                      <div className="title">End Date</div>
                      <DatePickerInput date={rowData.endDate} minDate={rowData.startDate} onChange={(date) => onChangeValue(rowData.id, "endDate", date)} />
                    </div>
                  </div>
                </div>
                <div className="btnWrap">
                  <Button
                    className="delBtn"
                    variant="outlined"
                    onClick={() => {
                      setLstObjective(lstObjective.filter((obj) => obj.id !== rowData.id).map((data, i) => ({ ...data, id: i + 1 })));
                      localStorage.removeItem(`obj${rowData.id}`);
                    }}
                  >
                    Delete
                  </Button>
                  <Button className="updateBtn" onClick={() => doUpdateObjective(rowData)}>
                    Update
                  </Button>
                </div>
              </div>
            ))}

            <div className="addBtnWrap">
              <Button className="addBtn" onClick={() => doAddObjective()}>
                <AddCircleIcon style={{ color: "#fff", fontSize: "18px", cursor: "pointer", marginRight: "5px" }} />
                Add Objective
              </Button>
            </div>
          </div>
        </TabList>
      </div>
    </div>
  );
};
export default MainPage;
