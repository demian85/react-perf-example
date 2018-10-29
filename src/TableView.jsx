import React from 'react';
import { connect } from 'react-redux';

import Table from './Table';

class TableView extends React.Component {
  render() {
    return (
      <section>
        <h1>Device List ({this.props.devices.length})</h1>
        <Table rows={this.props.devices} columns={this.props.columns} />
      </section>
    );
  }
}

const translateColumnName = (name) => { 
  /* ... */ 
  return name;
}

const filterDevices = (devices) => {
  return devices.filter((device) => !!device.active);
}

const transformColumns = (columns, userPrefs) => {
  const { lang } = userPrefs;
  return columns
    .map((column) => {
      const label = translateColumnName(column.label, lang);
      return { ...column, label };
    });
}

const mapStateToProps = (state) => {
  const deviceList = Object.values(state.devices);
  const devices = filterDevices(deviceList);
  const columns = transformColumns(state.columns, state.userPrefs);
  return { devices, columns };
}

export default connect(mapStateToProps)(TableView);