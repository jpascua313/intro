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
            src="https://app.fabric.microsoft.com/reportEmbed?reportId=434e6005-f72c-4289-a47e-9fd44306431f&autoAuth=true&ctid=6e629d7f-1c5c-416e-b0ea-f00072de97c2" 
            frameBorder="0" 
            allowFullScreen={true}
          />
        </div>
      </div>
    </Layout>
  );
}
