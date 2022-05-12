import React, { Component } from 'react';
import ProgressLoader from 'rn-progress-loader';
interface IndicatorProps {
  isLoading: any;
}
interface State {

}
export default class ProgressIndicator extends Component<IndicatorProps, State> {
  constructor(props: IndicatorProps) {
    super(props);
    this.state = {

    };
  }
  
  render() {
    return (
      <ProgressLoader
                        visible={this.props.isLoading}
                        isModal={true} isHUD={true}
                        //hudColor={"#ffffff00"}
						hudColor={"rgb(70,50,103)"}
                        style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
                        color={"#FFFFFF"} />
     
    );
  }

}



