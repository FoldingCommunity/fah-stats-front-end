import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { SetupURL } from 'utils/format';
import {
  Badge, Card, Row, Col,
} from 'antd';

const { Meta } = Card;
const styles = {
  subTitle: css`
    border-bottom: 1px solid #DDD;
  `,
  detailsContainer: css`
    img {
      max-width: 100%;
      height: auto!important;
    }
  `,
  summaryContainer: css`
    img {
      max-width: 100%;
      height: auto;
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
const ProjectCard = ({ project }) => {
  const footerActions = [
    <a target="_blank" rel="noopener noreferrer" href={SetupURL(project?.url)}>Project Website</a>,
  ];
  return (
    <div css={[
      styles.cardContainer,
    ]}
    >
      {(project?.status === 'error') ? (
        <Card
          css={styles.card}
          cover={(
            <Meta
              description="The owner has not added the description for the project."
            />
          )}
        />
      ) : (
        <Badge.Ribbon text={`cause: ${project?.cause}`} placement="start">
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
            <Row css={styles.summaryContainer} gutter={[16, 16]}>
              <Col lg={{ span: 12, order: 1 }} order={2}>
                {/* eslint-disable-next-line react/no-danger */}
                <p dangerouslySetInnerHTML={{
                  __html: project.mdescription.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" '),
                }}
                />
              </Col>
              <Col lg={{ span: 12, order: 2 }} order={1}>
                <img alt="" src={`data:image/png;base64,${project.mthumb}`} />
              </Col>
            </Row>
            <h3 css={styles.subTitle}>Details</h3>
            <p
              css={styles.detailsContainer}
              /* eslint-disable-next-line react/no-danger */
              dangerouslySetInnerHTML={{
                __html: project.description.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" '),
              }}
            />
          </Card>
        </Badge.Ribbon>
      )}
    </div>
  );
};
ProjectCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  project: PropTypes.object.isRequired,
};

export default ProjectCard;
