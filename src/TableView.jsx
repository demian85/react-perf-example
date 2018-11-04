import React from 'react';
import { connect } from 'react-redux';
import { updateUserLanguage } from './store/actions';

import Table from './Table';

import styles from './TableView.module.css';

class TableView extends React.Component {
  updateUserLanguage = (e) => {
    this.props.dispatch(updateUserLanguage(e.target.value));
  }

  render() {
    return (
      <section>
        <h1>Device List ({this.props.devices.length})</h1>
        <div className={styles.controls}>
          <label>
            User language:
            <select onChange={this.updateUserLanguage} value={this.props.userlanguage}>
              <option value="es-AR">es-AR</option>
              <option value="en-US">en-US</option>
            </select>
          </label>
        </div>
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
  return {
    devices,
    columns,
    userlanguage: state.userPrefs.lang,
  };
}

export default connect(mapStateToProps)(TableView);
