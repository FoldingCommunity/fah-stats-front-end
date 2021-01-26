import { Table } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

const DataTable = ({ columns, dataSource, pagination }) => (
  <Table
    bordered
    rowKey={() => uuid()}
    size="small"
    sticky
    columns={columns}
    dataSource={dataSource}
    pagination={pagination}
    scroll={{ x: 'fit-content' }}
  />
);

DataTable.propTypes = {
  columns: PropTypes.array, // eslint-disable-line
  dataSource: PropTypes.array, // eslint-disable-line
  pagination: PropTypes.object, // eslint-disable-line
};

export default DataTable;
