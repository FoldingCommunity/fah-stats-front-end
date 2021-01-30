import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { PrettyDate, PrettyCount, CertificateLink } from 'utils/format';
import TeamCardTeam from 'modules/Team/TeamCardTeam';
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
    max-width: 25rem;
    .ant-ribbon {
      top: 5rem;
    }
    &.topRankTeam {
    }
  `,
  otherRankTeam: css`
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
        font-family: SaintEliaRough;
        font-size: 1.6rem;
        text-transform: lowercase;
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
const TeamCard = ({ team, editAction }) => {
  const footerActions = [
    <CertificateLink id={team.id} type="wus" text="My Award" key="award" />,
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
  footerActions.push(`ID: ${team.id}`);

  const rank = team?.rank;
  let topRankTeam;
  let topRankPos;
  let topRankColor;

  if (rank >= 1 && rank <= 100) {
    topRankTeam = true;
    topRankPos = '100';
    topRankColor = '#ad8b00';
  } else if (rank <= 1000) {
    topRankTeam = true;
    topRankPos = '1K';
    topRankColor = '#fe6215';
  } else if (rank <= 10000) {
    topRankTeam = true;
    topRankPos = '10K';
    topRankColor = '#1890ff';
  } else {
    topRankTeam = false;
    topRankPos = '';
    topRankColor = '#fe6215';
  }

  return (
    <div css={[
      styles.cardContainer, (topRankTeam ? styles.topRankTeam : styles.otherRankTeam),
    ]}
    >
      <Badge.Ribbon text={topRankTeam ? `Top ${topRankPos} Ranked Team` : ''} style={{ backgroundColor: topRankColor }}>
        <Card
          actions={footerActions}
          css={styles.card}
          cover={(
            <Meta
              avatar={<SmileTwoTone css={styles.coverSmile} twoToneColor="#fe6215" />}
              title={team.name}
              description={(
                <>
                  <span>Rank </span>
                  <span css={styles.cardRank}>
                    <PrettyCount count={team.rank || team.users} />
                  </span>
                  <span> of </span>
                  <PrettyCount count={team.users} />
                </>
              )}
            />
          )}
        >
          <p>
            <span>I have earned </span>
            <strong><PrettyCount count={team.score} /></strong>
            <span> points by contibuting </span>
            <strong><PrettyCount count={team.wus} /></strong>
            <span> work units. </span>
            { team?.last && (
              <>
                <span>My work unit was last recorded </span>
                <PrettyDate date={team.last} />
              </>
            ) }
          </p>

          <h3 css={styles.subTitle}>Active clients</h3>
          <p>
            <strong><PrettyCount count={team.active_50} /></strong>
            <span> within 50 days</span>
            <br />
            <strong><PrettyCount count={team.active_7} /></strong>
            <span> within 7 days</span>
          </p>

          <h3 css={styles.subTitle}>My Teams</h3>
          <ul css={styles.teams}>
            {team?.teams?.map((team) => (
              <li key={team.team}><TeamCardTeam team={team} /></li>
            ))}
          </ul>
        </Card>
      </Badge.Ribbon>
    </div>
  );
};
TeamCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  team: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  editAction: PropTypes.func,
};

export default TeamCard;
