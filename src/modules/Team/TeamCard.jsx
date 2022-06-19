import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { PrettyCount, SetupURL } from 'utils/format';
import { Badge, Card } from 'antd';
import { TrophyTwoTone } from '@ant-design/icons';
import TeamLogo from 'modules/Team/TeamLogo';

const { Meta } = Card;
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
  dLogo: css`
    img {
      width: 4rem;
      height: 4rem;
      margin: 0;
      margin-right: 0.25rem;
    }
    .anticon {
      margin: 0 0.5rem;
      svg {
        width: 3rem;
        height: 3rem;
      }
    }
  `,
  cardContainer: css`
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
      background-color: #ffe9b4;
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
};
const TeamCard = ({ team }) => {
  const footerActions = [
    <a target="_blank" rel="noopener noreferrer" href={`https://apps.foldingathome.org/awards?team=${team?.id}&type=wus`} css={styles.certified}>
      <TrophyTwoTone twoToneColor="#fe6215" />
      <span>Team WUs Award</span>
    </a>,
    <a target="_blank" rel="noopener noreferrer" href={`https://apps.foldingathome.org/awards?team=${team?.id}`} css={styles.certified}>
      <TrophyTwoTone twoToneColor="#fe6215" />
      <span>Team Points Award</span>
    </a>,
    <a target="_blank" rel="noopener noreferrer" href={SetupURL(team?.url)}>Team Website</a>,
    `ID: ${team.id}`,
  ];

  const rank = team?.rank;
  let topRankTeam = false;
  let topRankPos = '';
  let topRankColor = '#fe6215';

  if (typeof rank !== 'number') {
    // Default
  } else if (rank >= 1 && rank <= 100) {
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
    // Default
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
              avatar={<TeamLogo logo={team?.logo} overrideStyles={styles.dLogo} />}
              title={team.name}
              description={(
                <>
                  <span>Rank </span>
                  <span css={styles.cardRank}>
                    <PrettyCount count={team.rank || team.users || '-'} />
                  </span>
                </>
              )}
            />
          )}
        >
          <p>
            <span>Team was founded by </span>
            <strong>{team.founder}</strong>
            <span> and has earned </span>
            <strong><PrettyCount count={team.score} /></strong>
            <span> points by contributing </span>
            <strong><PrettyCount count={team.wus} /></strong>
            <span> work units. </span>
          </p>
        </Card>
      </Badge.Ribbon>
    </div>
  );
};
TeamCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  team: PropTypes.object.isRequired,
};

export default TeamCard;
