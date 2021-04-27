import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { PrettyDate, PrettyCount, CertificateLink } from 'utils/format';
import DonorCardTeam from 'modules/Donor/DonorCardTeam';
import { Badge, Card, Button } from 'antd';
import { SmileTwoTone, EditOutlined } from '@ant-design/icons';

const { Meta } = Card;
const styles = {
  subTitle: css`
    border-bottom: 1px solid #DDD;
  `,
  container: css`
    margin: 1rem 0;
  `,
  width5: css`
    width: 5rem;
  `,
  width10: css`
    width: 10rem;
  `,
  width15: css`
    width: 15rem;
  `,
  searchInput: css`
    position: relative;
  `,
  clearIcon: css`
    position: absolute;
    right: 0;
    padding: 0.5rem;
    cursor: pointer;
  `,
  teams: css`
    padding-left: 1rem;
    max-height: 20rem;
    overflow-y: auto;
  `,
  cardContainer: css`
    max-width: 50rem;
    .ant-ribbon {
      top: 5rem;
    }
    &.topRankDonor {
    }
  `,
  otherRankDonor: css`
    .ant-ribbon {
      opacity: 0;
    }
  `,
  card: css`
    border-color: transparent;
    box-shadow: 0 1px 2px -2px #00000029, 0 3px 6px 0 #0000001f, 0 5px 12px 4px #00000017;
    .ant-card-meta {
      padding: 1rem;
      background-color: #e6f7ff;
      .ant-card-meta-title {
        color: #fe6215;
        margin: 0;
        font-size: 1.6rem;
        padding: 0 0.25rem;
      }
    }
    .ant-card-meta-avatar svg {
      margin: 0.5rem 0;
      height: 3rem;
      width: 3rem;
    }
  `,
  cardRank: css`
    color: #555555;
    font-weight: bold;
  `,
  linkButton: css`
    padding: 0;
    height: auto;
  `,
};
const DonorCard = ({ donor, editAction }) => {
  const footerActions = [
    <CertificateLink id={donor.id} type="wus" text="My Award" key="award" />,
  ];
  if (editAction) {
    footerActions.push(
      (
        <Button type="link" onClick={editAction} css={styles.linkButton}>
          <EditOutlined />
          <span> Edit name</span>
        </Button>
      ),
    );
  }
  footerActions.push(`ID: ${donor.id}`);

  const rank = donor?.rank;
  let topRankDonor;
  let topRankPos;
  let topRankColor;

  if (rank >= 1 && rank <= 100) {
    topRankDonor = true;
    topRankPos = '100';
    topRankColor = '#ad8b00';
  } else if (rank <= 1000) {
    topRankDonor = true;
    topRankPos = '1K';
    topRankColor = '#fe6215';
  } else if (rank <= 10000) {
    topRankDonor = true;
    topRankPos = '10K';
    topRankColor = '#1890ff';
  } else {
    topRankDonor = false;
    topRankPos = '';
    topRankColor = '#fe6215';
  }

  return (
    <div css={[
      styles.cardContainer, (topRankDonor ? styles.topRankDonor : styles.otherRankDonor),
    ]}
    >
      <Badge.Ribbon text={topRankDonor ? `Top ${topRankPos} Ranked Donor` : ''} style={{ backgroundColor: topRankColor }}>
        <Card
          actions={footerActions}
          css={styles.card}
          cover={(
            <Meta
              avatar={<SmileTwoTone css={styles.coverSmile} twoToneColor="#fe6215" />}
              title={donor.name}
              description={(
                <>
                  <span>Rank </span>
                  <span css={styles.cardRank}>
                    <PrettyCount count={donor.rank || donor.users} />
                  </span>
                  <span> of </span>
                  <PrettyCount count={donor.users} />
                </>
              )}
            />
          )}
        >
          <p>
            <span>I have earned </span>
            <strong><PrettyCount count={donor.score} /></strong>
            <span> points by contibuting </span>
            <strong><PrettyCount count={donor.wus} /></strong>
            <span> work units. </span>
            { donor?.last && (
              <>
                <span>My work unit was last recorded </span>
                <PrettyDate date={donor.last} />
              </>
            ) }
          </p>

          <h3 css={styles.subTitle}>Active clients</h3>
          <p>
            <strong><PrettyCount count={donor.active_50} /></strong>
            <span> within 50 days</span>
            <br />
            <strong><PrettyCount count={donor.active_7} /></strong>
            <span> within 7 days</span>
          </p>

          <h3 css={styles.subTitle}>My Teams</h3>
          <ul css={styles.teams}>
            {donor?.teams?.map((team) => (
              <li key={team.team}><DonorCardTeam team={team} /></li>
            ))}
          </ul>
        </Card>
      </Badge.Ribbon>
    </div>
  );
};
DonorCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  donor: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  editAction: PropTypes.func,
};

export default DonorCard;
