import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  logoutUser,
  userNameFetch,
  firstNameChanged,
  lastNameChanged,
  newUserNameSave
} from "../../actions";
import {
  Screen,
  Section,
  Input,
  Button
} from '../common';
import {RED, SCREEN_HEIGHT, SCREEN_WIDTH} from "../../variables";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      confirmPassword: '',
    };
  }

  onFirstNameChange(text) {
    this.props.firstNameChanged(text)
  }

  onLastNameChange(text) {
    this.props.lastNameChanged(text)
  }

  componentWillMount() {
    _.each(this.props.uid, (value, prop) => {
      this.props.firstNameChanged({ prop, value });
    });
  }

  submitToFirebase() {
    const { email, firstName, lastName } = this.props;

    this.props.newUserNameSave({ email, firstName, lastName })
  }

  renderButton() {
    if (this.props.loading || this.state.loading) {
      return <Spinner style={{ alignSelf: 'center', color: '#fff' }} size='large' />;
    }
    return (
      <Button
        style={styles.changeNameButton}
        onPress={this.submitToFirebase.bind(this)}
        text='Изменить'
        textStyle={styles.changeNameButtonText}
      />
    );
  }

  render() {
    return (
      <Screen>
        <Section style={styles.userArea}>
          <Image
            source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
            style={styles.avatar}
          />

          <Section style={styles.nameInputForm}>
            <Text style={styles.nameInputFormLabel}>Имя</Text>
            <Input
              value={this.props.firstName}
              onChangeText={this.onFirstNameChange.bind(this)}
              textStyle={styles.inputFormText}
            />
          </Section>

          <Section style={styles.nameInputForm}>
            <Text style={styles.nameInputFormLabel}>Фамилия</Text>
            <Input
              value={this.props.lastName}
              onChangeText={this.onLastNameChange.bind(this)}
              textStyle={styles.inputFormText}
            />
          </Section>
        </Section>

        <View>{this.renderButton()}</View>

        <TouchableOpacity onPress={() => {
          this.props.logoutUser()
        }}>
          <Section style={styles.exitArea}>
            <Text style={styles.exitText}>
              Выход
            </Text>
            <Icon name='log-out' style={styles.logOutIcon} size={26}/>
          </Section>
        </TouchableOpacity>
      </Screen>
    );
  }
};

const styles = StyleSheet.create({
  userArea: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 60,
    marginBottom: 10
  },
  nameInputForm: {
    marginHorizontal: 10,
  },
  nameInputFormLabel: {
    fontSize: 15,
    color: '#4c4c4c',
  },
  inputFormText: {
    textAlign: 'left',
    paddingLeft: 0,
    width: SCREEN_WIDTH * 1
  },
  settingsIcon: {
    color: '#4c4c4c',
  },
  changeNameButton: {
    backgroundColor: '#2AD2AC',
    alignItems: 'center',
    justifyContent: 'center',
    width: (SCREEN_WIDTH - 20),
    marginVertical: 10
  },
  changeNameButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  exitArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#d3d3d3',
    borderRadius: 0,
    marginHorizontal: 10,
    marginTop: 30,
    paddingVertical: 20,
  },
  exitText: {
    alignSelf: 'center',
    fontSize: 24,
    color: RED,
  },
  logOutIcon: {
    color: RED
  },
});

const mapStateToProps = ({ auth }) => {
  const { email, firstName, lastName, loading } = auth;
  return { email, firstName, lastName, loading }
}

export default connect(mapStateToProps, {
  logoutUser,
  userNameFetch,
  firstNameChanged,
  lastNameChanged,
  newUserNameSave
})(Profile)