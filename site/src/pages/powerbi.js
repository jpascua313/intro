import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './powerbi.module.css';

export default function PowerBISample() {
  return (
    <Layout
      title="Power BI Sample"
      description="Power BI Report Dashboard">
      <div className={styles.container}>
        <Heading as="h1">NovaSmiles Power BI Dashboard</Heading>
        <p className={styles.description}>
          This is a sample of an Enterprise-Level Dashboard for an Orthodontic Support Organization with mock data.
        </p>
        <div className={styles.reportContainer}>
          <iframe 
            title="NovaSmiles" 
            className={styles.iframe}
            src="https://app.powerbi.com/view?r=eyJrIjoiMzFjNWRiZmEtNTlhNC00NjYwLWJhZDQtODM0YTM3YjU5OWE4IiwidCI6IjZlNjI5ZDdmLTFjNWMtNDE2ZS1iMGVhLWYwMDA3MmRlOTdjMiIsImMiOjF9" 
            frameBorder="0" 
            allowFullScreen={true}
          />
        </div>
      </div>
    </Layout>
  );
}
