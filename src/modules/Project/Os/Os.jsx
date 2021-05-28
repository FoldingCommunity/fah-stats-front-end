import DataTable from 'elements/DataTable/DataTable';
import React, { useEffect } from 'react';
import { getOs } from 'store/stats/actions';
import { useDispatch, useSelector } from 'react-redux';
import { PrettyCount } from 'utils/format';

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
      width: 100,
      fixed: 'left',
      sorter: (a, b) => a?.OS?.localeCompare(b?.OS),
    },
    {
      title: 'AMD GPUs',
      dataIndex: 'AMD GPUs',
      key: 'AMD GPUs',
      align: 'right',
      width: 100,
      render: (count) => <PrettyCount count={count} />,
      sorter: (a, b) => a['AMD GPUs'] - b['AMD GPUs'],
    },
    {
      title: 'NVidia GPUs',
      dataIndex: 'NVidia GPUs',
      key: 'NVidia GPUs',
      align: 'right',
      width: 100,
      render: (count) => <PrettyCount count={count} />,
      sorter: (a, b) => a['NVidia GPUs'] - b['NVidia GPUs'],
    },
    {
      title: 'CPUs',
      dataIndex: 'CPUs',
      key: 'CPUs',
      align: 'right',
      width: 100,
      render: (count) => <PrettyCount count={count} />,
      sorter: (a, b) => a.CPUs - b.CPUs,
    },
    {
      title: 'TFLOPS',
      dataIndex: 'TFLOPS',
      key: 'TFLOPS',
      align: 'right',
      width: 100,
      render: (count) => <PrettyCount count={count} />,
      sorter: (a, b) => a.TFLOPS - b.CPTFLOPSUs,
    },
    {
      title: 'x86 TFLOPS',
      dataIndex: 'x86 TFLOPS',
      key: 'x86 TFLOPS',
      align: 'right',
      width: 100,
      render: (count) => <PrettyCount count={count} />,
      sorter: (a, b) => a['x86 TFLOPS'] - b['x86 TFLOPS'],
    },
  ];

  return (
    <>
      <h1>OS Statistics</h1>
      <DataTable
        columns={columns}
        dataSource={stats?.os}
        pagination={false}
      />
      &nbsp;
      <p>
        CPUs and GPUs which have returned Work Units within the
        last 3 days are listed by OS. FLOPS per core is estimated.
      </p>
      <p>
        <b>TFLOPS</b>
        &nbsp;
        is Tera Floating-point OPerations per Second or
        trillions of math operations per second. Please see our
        &nbsp;
        <a href="https://foldingathome.org/support/faq/flops" rel="noreferrer" target="_blank">FLOPS FAQ</a>
        &nbsp;
        for more information.
      </p>
    </>
  );
};

export default Os;
