import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa'; // Globe icon for language switcher
import styles from '../styles/LanguageSwitcher.module.css'; // Import CSS Module for styling

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className={styles.languageSwitcher}>
      <FaGlobe
        onClick={() => setIsOpen(!isOpen)}
        className={styles.languageIcon}
        size={24} // Adjust size as needed
      />
      {isOpen && (
        <div className={styles.languageDropdown}>
          <button onClick={() => handleLanguageChange('en')}>English</button>
          <button onClick={() => handleLanguageChange('sv')}>Svenska</button>
          <button onClick={() => handleLanguageChange('fr')}>Français</button>
          <button onClick={() => handleLanguageChange('de')}>Deutsch</button>
          {/* Add more languages as needed */}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
