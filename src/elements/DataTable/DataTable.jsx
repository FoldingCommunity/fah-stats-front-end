import { Table } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

const DataTable = ({ columns, dataSource, pagination }) => (
  <Table
    columns={columns}
    dataSource={dataSource}
    pagination={pagination}
  />
);

DataTable.propTypes = {
  columns: PropTypes.array, // eslint-disable-line
  dataSource: PropTypes.array, // eslint-disable-line
  pagination: PropTypes.object, // eslint-disable-line
};

export default DataTable;
