import Toolbar from "react-big-calendar/lib/Toolbar";
// design custom design or elements for top navigation toolbaar, for today, next, prev or all views
export const CustomToolbar = ({ handleChange }) => {
  return class BaseToolBar extends Toolbar {
    constructor(props) {
      super(props);
    }
    // handleDayChange = (event, mconte) => {
    //   mconte(event.target.value);
    // };
    handleDayChange = (value, mconte) => {
      mconte(value);
    };
    handleNamvigate = (detail, elem) => {
      detail.navigate(elem);
    };

    render() {
      return (
        <span className="posr" style={{ float: "left" }}>
          <span
            className="rbc-btn-group"
            style={{
              float: "left",
              // position: "fixed",
            }}
          >
            <button
              type="button"
              className="nextp-btn"
              onClick={() => this.handleNamvigate(this, "PREV")}
            >
              {"<"}
            </button>
            <button
              type="button"
              className="nextp-btn"
              onClick={() => this.handleNamvigate(this, "NEXT")}
            >
              {">"}
            </button>
            <button
              type="button"
              className="defaultbtn"
              onClick={() => this.handleNamvigate(this, "TODAY")}
            >
              Today
            </button>
            <span
              class="bar-right"
              style={{
                float: "right",
                width: "57px",
                backgroundcolor: "blue",
              }}
            >
              {this.props.label}
            </span>
            <span
              style={{
                // float: "left",
                position: "fixed",
                left: "80%",
                // right: "70%",
              }}
            >
              <button
                type="button"
                className="defaultbtn"
                onClick={(e) => this.handleDayChange("month", this.view)}
              >
                month
              </button>
              <button
                type="button"
                className="defaultbtn"
                onClick={(e) => this.handleDayChange("week", this.view)}
              >
                week
              </button>
              <button
                type="button"
                className="defaultbtn"
                onClick={(e) => this.handleDayChange("day", this.view)}
              >
                day
              </button>
              <button
                type="button"
                className="defaultbtn"
                onClick={(e) => this.handleDayChange("agenda", this.view)}
              >
                list
              </button>
            </span>
          </span>
        </span>
      );
    }
  };
};
