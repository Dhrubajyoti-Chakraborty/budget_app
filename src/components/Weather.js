import React from "react";

class Weather extends React.Component {
    render() {
        return (
            <div>
                {this.props.city && this.props.country && <p> {this.props.city},{this.props.country}  </p> }
                {this.props.temperature && <p>{this.props.temperature}</p>}
                {this.props.humidity && <p>{this.props.humidity}</p>}
                {this.props.description && <p>{this.props.description}</p>}
                {this.props.error && <p>{this.props.error}</p>}


            </div>

        );

    }
  
};

export default Weather;