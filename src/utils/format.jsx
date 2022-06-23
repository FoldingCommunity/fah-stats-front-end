/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { TrophyTwoTone } from '@ant-design/icons';
import { css } from '@emotion/react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(utc);

const styles = {
  certified: css`
    > span {
      color: #fe6215;
    }
    vertical-align: middle;
    .anticon {
      margin-right: 0.25rem;
    }
  `,
};

export const SetupURL = (url) => ((url && !url.includes('http')) ? `https://${url}` : url);

export const PrettyDate = ({ date }) => {
  const localDate = date && dayjs.utc(date).local();
  if (localDate) {
    return (<Tooltip title={localDate.format()}>{`${localDate.fromNow(true)} ago`}</Tooltip>);
  }
  return (<span>{date}</span>);
};

PrettyDate.propTypes = {
  date: PropTypes.string.isRequired,
};

export const PrettyCount = ({ count, maximumFractionDigits }) => (count?.toLocaleString(
  undefined, { maximumFractionDigits: maximumFractionDigits || 0 },
) || (<span>{count}</span>));
PrettyCount.propTypes = {
  // eslint-disable-next-line react/require-default-props
  maximumFractionDigits: PropTypes.number,
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export const CertificateLink = ({
  id, text, type, forUser,
}) => {
  let url;
  const recipient = forUser ? 'user' : 'team';
  if (type) url = `https://apps.foldingathome.org/awards?${recipient}=${id}&type=${type}`;
  else url = `https://apps.foldingathome.org/awards?${recipient}=${id}`;
  return id && text && (
    <a target="_blank" rel="noopener noreferrer" href={url} css={styles.certified}>
      <TrophyTwoTone twoToneColor="#fe6215" />
      <span>{text}</span>
    </a>
  );
};

CertificateLink.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string, // eslint-disable-line
  forUser: PropTypes.bool, // eslint-disable-line
};
