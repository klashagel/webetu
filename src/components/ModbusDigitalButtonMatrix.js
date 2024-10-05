import React from 'react';
import ModbusDigitalButton from './ModbusDigitalButton'; // Adjust the import path based on your project structure
import styles from '../styles/ModbusDigitalButtonMatrix.module.css'; // Import CSS Module

const ModbusDigitalButtonMatrix = ({ ip, matrix }) => {
  return (
    <div className={styles.buttonContainer}>
      {matrix.map((item, index) => (
        <div className={styles.buttonItem} key={index}>
          <ModbusDigitalButton
            text={item.text}
            registerPath={item.registerPath}
            ip={ip}
            register={item.register}
          />
        </div>
      ))}
    </div>
  );
};

export default ModbusDigitalButtonMatrix;
