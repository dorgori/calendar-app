import Toolbar from "react-big-calendar/lib/Toolbar";
import styled from "styled-components";

const Button = styled.button`
  background: rgb(47, 79, 79);
  color: white;
  border-radius: 1px;
  height: 30px;
  width: 45px;
  border: none;
`;

// design custom design or elements for top navigation toolbaar, for today, next, prev or all views

export const CustomToolbar = () => {
  return class BaseToolBar extends Toolbar {
    constructor(props) {
      super(props);
    }
    handleDayChange = (value, mconte) => {
      mconte(value);
    };
    handleNamvigate = (detail, elem) => {
      detail.navigate(elem);
    };

    render() {
      return (
        <div
          className="container"
          style={{
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <div className="rbc-btn-group">
            <Button onClick={() => this.handleNamvigate(this, "PREV")}>
              {"<"}
            </Button>
            <Button onClick={() => this.handleNamvigate(this, "NEXT")}>
              {">"}
            </Button>
            <Button
              style={{ backgroundColor: "grey", marginLeft: "10px" }}
              onClick={() => this.handleNamvigate(this, "TODAY")}
            >
              today
            </Button>
          </div>
          <div>{this.props.label}</div>
          <div>
            <Button onClick={(e) => this.handleDayChange("month", this.view)}>
              month
            </Button>
            <Button onClick={(e) => this.handleDayChange("week", this.view)}>
              week
            </Button>
            <Button onClick={(e) => this.handleDayChange("day", this.view)}>
              day
            </Button>
            <Button onClick={(e) => this.handleDayChange("agenda", this.view)}>
              list
            </Button>
          </div>
        </div>
      );
    }
  };
};
