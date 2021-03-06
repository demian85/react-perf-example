import React from 'react';

import styles from './Table.module.css';

export default class Table extends React.PureComponent {
  render() {
    return (
      <table className={styles.root}>
        <thead>
          <tr>
            {this.buildHeader()}
          </tr>
        </thead>
        <tbody>
          {this.buildRows()}
        </tbody>
      </table>
    );
  }

  buildHeader() {
    return this.props.columns.map((col) => {
      return (
        <th key={col.key} style={{ width: `${col.width}px` }}>{col.label} ({col.width}px)</th>
      );
    })
  }

  buildRows() {
    return this.props.rows.map((row) => {
      return (
        <tr key={row.id}>
          {
            this.props.columns.map((col) => {
              return (
                <td key={col.key}>{row[col.key]}</td>
              );
            })
          }
        </tr>
      );
    });
  }
}
