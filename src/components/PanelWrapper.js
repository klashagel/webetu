// PanelWrapper.jsx or PanelWrapper.js
import React from 'react';
import styles from '../styles/Panel.module.css'; // Import the CSS Module

const PanelWrapper = ({ title, children }) => {
  return (
    <div className={styles.panel}>
      {title && <div className={styles.panelTitle}>{title}</div>}
      <div className={styles.panelContent}>
        {children}
      </div>
    </div>
  );
};

export default PanelWrapper;
