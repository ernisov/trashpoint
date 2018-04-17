import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

import {
  Screen,
  Section
} from '../common';

const LanguageChange = () => {
  return (
    <Screen>
      <TouchableOpacity>
        <Section style={styles.languageArea}>
          <Text style={styles.chosenLanguageText}>
            Русский
          </Text>
        </Section>
      </TouchableOpacity>

      <Text style={styles.infoTemporaryText}>
        Работаем над добавлением других языков
      </Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  languageArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#d3d3d3',
    borderRadius: 0,
    marginHorizontal: 10,
    paddingVertical: 20
  },
  languageText: {
    alignSelf: 'center',
    fontSize: 21,
    color: '#4c4c4c',
  },
  chosenLanguageText: {
    alignSelf: 'center',
    fontSize: 21,
    color: '#4c4c4c',
    fontWeight: 'bold'
  },
  infoTemporaryText: {
    marginTop: 20,
    alignSelf: 'center',
    fontStyle: 'italic',
    fontSize: 17,
    color: '#4c4c4c',
  }
});

export { LanguageChange };