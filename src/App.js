import "./styles.css";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const dataJSON = [
  {
    guestID: 1,
    name: "Daron",
    roomID: 18,
    startDate: "10/8/2021",
    endDate: "10/14/2021"
  },
  {
    guestID: 2,
    name: "Gertrudis",
    roomID: 7,
    startDate: "11/29/2021",
    endDate: "12/12/2021"
  },
  {
    guestID: 3,
    name: "Rancell",
    roomID: 26,
    startDate: "2/20/2021",
    endDate: "11/16/2021"
  },
  {
    guestID: 4,
    name: "Niki",
    roomID: 15,
    startDate: "11/23/2021",
    endDate: "11/29/2021"
  },
  {
    guestID: 5,
    name: "Bird",
    roomID: 40,
    startDate: "11/27/2021",
    endDate: "11/28/2021"
  }
];

const getDates = function (period) {
  const dates = [];
  let today = new Date() - 1000 * 60 * 60 * 24 * period;
  for (let i = 4; i > -1; i--) {
    let day = new Date(today - 1000 * 60 * 60 * 24 * i);
    dates.push(day);
  }
  return dates;
};
const updateData = function (data, dates) {
  if (dates)
    data.map(function (d) {
      d.start = undefined;
      d.end = undefined;
      for (let i = 0; i < dates.length; i++) {
        if (
          new Date(dates[i]).toDateString() ===
          new Date(d.startDate).toDateString()
        ) {
          d.start = i;
          d.color = getColor(data.indexOf(d));
          d.nameToShow = d.name;
          d.radiusLeft = 15;
          d.radiusRight = 15;
        } else {
          if (!d.start) {
            d.start = 0;
          }
        }
        if (
          new Date(dates[i]).toDateString() ===
          new Date(d.endDate).toDateString()
        ) {
          d.end = i + 1;
          d.color = getColor(data.indexOf(d));
          d.nameToShow = d.name;
          d.radiusLeft = 15;
          d.radiusRight = 15;
        } else {
          if (!d.end) {
            d.end = 0;
            if (d.start !== 0) {
              d.color = getColor(data.indexOf(d));
              d.nameToShow = d.name;
              d.radiusLeft = 15;
              d.radiusRight = 15;
            }
            if (d.start === d.end) {
              d.color = "white";
              d.nameToShow = "";
              d.radiusLeft = 15;
              d.radiusRight = 15;
            }
          }
        }

        if (new Date(d.startDate).getTime() < new Date(dates[0]).getTime()) {
          d.start = 0;
          d.radiusLeft = 0;
          d.radiusRight = 15;
        }
        if (new Date(d.endDate).getTime() > new Date(dates[4]).getTime()) {
          d.end = 5;
          d.radiusLeft = 15;
          d.radiusRight = 0;
        }
        if (
          new Date(d.startDate).getTime() < new Date(dates[0]).getTime() &&
          new Date(d.endDate).getTime() > new Date(dates[4]).getTime()
        ) {
          d.start = 0;
          d.end = 5;
          d.color = getColor(data.indexOf(d));
          d.nameToShow = d.name;
          d.radiusLeft = 0;
          d.radiusRight = 0;
        }
      }

      return d;
    });
  return data;
};

const getColor = function (j) {
  const colors = ["#7ff9ba", "#f8ec95", "#f888d5", "#4652f2", "#be87f8"];
  // return Math.floor(Math.random() * 16777215).toString(16);
  return colors[j];
};

export default function App() {
  let [period, setPeriod] = useState(0);
  let [dates, setDates] = useState(getDates(0));
  let [data, setData] = useState(updateData(dataJSON, dates));

  const buttonArrowStyle = {
    backgroundColor: "white",
    display: "flex",
    padding: 4,
    margin: 5,
    color: "#3388FF",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0
  };

  function goBack() {
    period += 5;
    setPeriod(period);
    setDates(getDates(period));
    setData(updateData(data, dates));
  }
  function goForward() {
    period -= 5;
    setPeriod(period);
    setDates(getDates(period));
    setData(updateData(data, dates));
  }
  updateData(data);

  return (
    <div style={{ display: "block", padding: 30 }}>
      <h4>Guest Book</h4>

      <Row
        style={{
          padding: 2,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          fontWeight: "bold",
          alignItems: "center"
        }}
      >
        <Row style={{ flex: 1 }}>
          <input></input>
        </Row>
        <Row
          style={{
            flex: 3,
            borderColor: "#222",
            borderStyle: "solid",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            fontWeight: "bold"
          }}
        >
          <button onClick={goBack} style={buttonArrowStyle}>
            <AiOutlineArrowLeft className="icon" />
          </button>
          <div>{dates[0].toDateString()}</div>
          <button onClick={goForward} style={buttonArrowStyle}>
            <AiOutlineArrowRight className="icon" />
          </button>
        </Row>
      </Row>
      <Row>
        <Col
          style={{
            backgroundColor: "",
            flex: 8,
            padding: 1,
            borderColor: "#222",
            borderStyle: "solid",
            borderTopWidth: 0,
            borderBottomWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            fontWeight: "bold"
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyItems: "center"
            }}
          >
            {"Все номера"}
          </div>
        </Col>

        {dates.map(function (date) {
          return (
            <Col
              style={{
                borderColor: "#222",
                borderStyle: "solid",
                borderTopWidth: 0,
                borderBottomWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                flex: 7,
                paddingRight: 1
              }}
            >
              {date.toDateString()}
            </Col>
          );
        })}
      </Row>
      {data.map(function (d) {
        return (
          <Row
            style={{
              borderColor: "#222",
              borderStyle: "solid",
              borderTopWidth: 0,
              borderBottomWidth: 1,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              alignItems: "center"
            }}
          >
            <Col style={{ flex: 1 }}>
              {" "}
              <Row
                style={{
                  backgroundColor: "white",
                  height: "50px",
                  fontSize: "14px",
                  borderColor: "#222",
                  borderStyle: "solid",
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  borderLeftWidth: 0,
                  borderRightWidth: 1
                }}
              >
                <Col style={{ flex: 10 }}>{"Номер " + d.roomID}</Col>
                <Col
                  style={{
                    flex: 2,
                    backgroundColor: d.color,
                    borderRadius: 15,
                    margin: 12
                  }}
                >
                  {" "}
                  1
                </Col>
              </Row>
            </Col>
            <Col
              style={{
                flex: 8,
                padding: 3
              }}
            >
              <Col
                style={{
                  borderBottomLeftRadius: d.radiusLeft,
                  borderTopLeftRadius: d.radiusLeft,
                  borderBottomRightRadius: d.radiusRight,
                  borderTopRightRadius: d.radiusRight,
                  color: "white",
                  left: d.start * 20 + "%",
                  backgroundColor: d.color,
                  width: (d.end - d.start) * 20 + "%",
                  justifyContent: "center"
                }}
              >
                {d.nameToShow}
              </Col>
            </Col>
          </Row>
        );
      })}
    </div>
  );
}
