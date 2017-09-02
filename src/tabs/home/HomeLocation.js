import React from 'react';
import Button from 'react-bootstrap/lib/Button'
import Panel from 'react-bootstrap/lib/Panel';
import AddressMap from './AddressMap';
import fire from '../../util/fire';

class HomeLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          hours : []
        };
    }

    /**
    * Loads the hours array with hours stored in Firebase database:
    */
    componentWillMount() {
      // Get the reference to the database index of the image folder:
      let hoursRef = fire.database().ref('assets/hours').orderByKey();
      // Add every URL available in the index:
      hoursRef.once('value').then(snapshot => {
        this.setState({ hours: snapshot.val() });
      });
    }g

    render() {
        return(
            <div className="col-lg-12">

                <div className="col-lg-6 sameheight">
                    <Panel header="Hours">
                      {this.state.hours.map((day) =>
                          <p key={day.name}>{day.name} : {day.hours}</p>
                      )}
                      <div className="run"></div>
                      <div className="walk"></div>
                    </Panel>
                </div>

                <div className="col-lg-6 sameheight">
                    <Panel id="home-map-panel" header="Location">
                        <AddressMap id="home-map" className="col-lg-12"/>
                    </Panel>
                </div>

            </div>
        )
    }
};

export default HomeLocation;
