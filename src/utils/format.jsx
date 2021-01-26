/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { SafetyCertificateTwoTone } from '@ant-design/icons';
import { css } from '@emotion/react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const styles = {
  certified: css`
    vertical-align: middle;
    .anticon {
      margin-right: 0.25rem;
    }
  `,
};

export const PrettyDate = ({ date }) => (date ? (<Tooltip title={date}>{`${dayjs(date).fromNow(true)} ago`}</Tooltip>) : (<span>{date}</span>));
PrettyDate.propTypes = {
  date: PropTypes.string.isRequired,
};

export const PrettyCount = ({ count }) => (count?.toLocaleString(
  undefined, { maximumFractionDigits: 0 },
) || (<span>{count}</span>));
PrettyCount.propTypes = {
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),,
};

export const CertificateLink = ({ id, text, type }) => (id && text && type && (
  <a target="_blank" rel="noopener noreferrer" href={`https://apps.foldingathome.org/awards?user=${id}&type=${type}`} css={styles.certified}>
    <SafetyCertificateTwoTone twoToneColor="#fe6215" />
    <span>{text}</span>
  </a>
));
CertificateLink.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
