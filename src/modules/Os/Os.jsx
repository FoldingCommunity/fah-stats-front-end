import DataTable from 'elements/DataTable/DataTable';
import React, { useEffect } from 'react';
import { getOs } from 'store/stats/actions';
import { useDispatch, useSelector } from 'react-redux';

const Os = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOs({}));
  }, []);

  const stats = useSelector((state) => state.stats);
  const columns = [
    {
      title: 'OS',
      dataIndex: 'OS',
      key: 'OS',
      sorter: (a, b) => a.OS.localeCompare(b.OS),
    },
    {
      title: 'AMD GPUs',
      dataIndex: 'AMD GPUs',
      key: 'AMD GPUs',
      align: 'right',
      render: (text) => text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      sorter: (a, b) => a['AMD GPUs'] - b['AMD GPUs'],
    },
    {
      title: 'NVidia GPUs',
      dataIndex: 'NVidia GPUs',
      key: 'NVidia GPUs',
      align: 'right',
      render: (text) => text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      sorter: (a, b) => a['NVidia GPUs'] - b['NVidia GPUs'],
    },
    {
      title: 'CPUs',
      dataIndex: 'CPUs',
      key: 'CPUs',
      align: 'right',
      render: (text) => text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      sorter: (a, b) => a.CPUs - b.CPUs,
    },
    {
      title: 'TFLOPS',
      dataIndex: 'TFLOPS',
      key: 'TFLOPS',
      align: 'right',
      render: (text) => text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      sorter: (a, b) => a.TFLOPS - b.CPTFLOPSUs,
    },
    {
      title: 'x86 TFLOPS',
      dataIndex: 'x86 TFLOPS',
      key: 'x86 TFLOPS',
      align: 'right',
      render: (text) => text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      sorter: (a, b) => a['x86 TFLOPS'] - b['x86 TFLOPS'],
    },
  ];

  return (
    <>
      <h1>OS Statistics</h1>
      <DataTable
        columns={columns}
        dataSource={stats?.os}
        pagination={{ defaultPageSize: 10 }}
      />
    </>
  );
};

export default Os;
