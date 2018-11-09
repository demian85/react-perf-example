import React from 'react';
import { connect } from 'react-redux';

import { updateUserLanguage } from '../store/actions';
import Table from './Table';
import Controls from './Controls';

class TableView extends React.Component {
  render() {
    return (
      <section>
        <h1>Device List ({this.props.devices.length})</h1>
        <Controls onLanguageChange={(value) => this.updateUserLanguage(value)} userLanguage={this.props.userLanguage} />
        <Table rows={this.props.devices} columns={this.props.columns} />
      </section>
    );
  }

  updateUserLanguage(value) {
    this.props.dispatch(updateUserLanguage(value));
  }
}

const translateColumnName = (name, lang) => {
  const map = {
    'ID': 'ID',
    'Name': 'Nombre',
    'Time': 'Hora',
    'Location': 'Ubicación',
  };
  return lang.startsWith('es') ? map[name] : name;
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
  return {
    devices,
    columns,
    userLanguage: state.userPrefs.lang,
  };
}

export default connect(mapStateToProps)(TableView);
