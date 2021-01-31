import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { SetupURL } from 'utils/format';
import { Badge, Card } from 'antd';

const { Meta } = Card;
const styles = {
  subTitle: css`
    border-bottom: 1px solid #DDD;
  `,
  summaryContainer: css`
    display: flex;
    img {
      max-width: 20rem;
      max-height: 20rem;
    }
    p {
      flex: 1;
      margin-right: 1rem;
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
    max-width: 50rem;
    .ant-ribbon {
      top: 5rem;
    }
  `,
  card: css`
    border-color: transparent;
    box-shadow: 0 1px 2px -2px #00000029, 0 3px 6px 0 #0000001f, 0 5px 12px 4px #00000017;
    .ant-card-meta {
      padding: 1rem;
      background-color: #e9eaff;
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
};
const ProjectCard = ({ project }) => {
  const footerActions = [
    <a target="_blank" rel="noopener noreferrer" href={SetupURL(project?.url)}>Project Website</a>,
  ];
  return (
    <div css={[
      styles.cardContainer,
    ]}
    >
      <Badge.Ribbon text={`disease: ${project?.cause}`}>
        <Card
          actions={footerActions}
          css={styles.card}
          cover={(
            <Meta
              title={project?.manager}
              description={project?.institution}
            />
          )}
        >
          <h3 css={styles.subTitle}>Summary</h3>
          <div css={styles.summaryContainer}>
            {/* eslint-disable-next-line react/no-danger */}
            <p dangerouslySetInnerHTML={{
              __html: project.mdescription.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" '),
            }}
            />
            <div>
              <img alt="" src={`data:image/png;base64,${project.mthumb}`} />
            </div>
          </div>

          <h3 css={styles.subTitle}>Details</h3>
          {/* eslint-disable-next-line react/no-danger */}
          <p dangerouslySetInnerHTML={{
            __html: project.description.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" '),
          }}
          />
        </Card>
      </Badge.Ribbon>
    </div>
  );
};
ProjectCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  project: PropTypes.object.isRequired,
};

export default ProjectCard;
