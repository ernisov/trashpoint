import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import {
  emailChanged,
  passwordChanged,
  firstNameChanged,
  lastNameChanged,
  registerUser,
} from '../actions';

// Components import
import {
  Screen,
  Button,
  Spinner,
  Input,
} from './common';

import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from '../variables';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      confirmPassword: '',
    };
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onFirstNameChange(text) {
    this.props.firstNameChanged(text)
  }

  onLastNameChange(text) {
    this.props.lastNameChanged(text)
  }

  submitToFirebase() {
    this.setState({ loading: true });
    const { confirmPassword } = this.state;
    const { email, password, firstName, lastName } = this.props;

    if (email === '' || password === '' || firstName === '' || lastName === '') {
      Alert.alert(
        'Ошибка ввода',
        'Пожалуйста заполните все поля',
        [
          { text: 'Ok' },
        ]
      );
    } else if (password !== confirmPassword) {
      Alert.alert(
        'Ошибка ввода',
        'Пароли не совпадают',
        [
          { text: 'Ok' },
        ]
      );
    } else {
      this.props.registerUser({ email, password, firstName, lastName });
    }

    this.setState({ loading: false });
  }

  renderButton() {
    if (this.props.loading || this.state.loading) {
      return <Spinner style={{ alignSelf: 'center', color: '#fff' }} size='large' />;
    }
    return (
      <Button
        style={styles.createAccButton}
        onPress={this.submitToFirebase.bind(this)}
        text='Создать аккаунт'
        textStyle={styles.createAccText}
      />
    );
  }

  renderPost() {
    firebase.auth().signOut().then(() => {
      Actions.pop();
    }).catch(() => console.log('sign out failed'));
  }
  
  render() {
    return (
      <Screen scrollable>
        {!this.props.sent ?
          <Animated.View
            style={{ flex: 1, opacity: this.state.opacityValue }}
          >
            <View style={styles.mainView}>
              <KeyboardAvoidingView behavior='position'>
                <Text style={styles.signUpLabel}>Регистрация</Text>
                <View>
                  <View style={styles.signUpForm}>
                    <View style={styles.signUpInput}>
                      <Text style={styles.signUpInputLabel}>Имя</Text>
                      <Input
                        placeholder='Гарри'
                        onChangeText={this.onFirstNameChange.bind(this)}
                        value={this.props.value}
                        textStyle={styles.inputFormText}
                      />
                    </View>

                    <View style={styles.signUpInput}>
                      <Text style={styles.signUpInputLabel}>Фамилия</Text>
                      <Input
                        placeholder='Поттер'
                        onChangeText={this.onLastNameChange.bind(this)}
                        value={this.props.value}
                        textStyle={styles.inputFormText}
                      />
                    </View>

                    <View style={styles.signUpInput}>
                      <Text style={styles.signUpInputLabel}>Электроная Почта</Text>
                      <Input
                        placeholder='example@domain.com'
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.value}
                        textStyle={styles.inputFormText}
                      />
                    </View>

                    <View style={styles.signUpInput}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.signUpInputLabel}>Пароль</Text>
                        <Text style={styles.passwordConstraint}>не менее 6 символов</Text>
                      </View>
                      <Input
                        secureTextEntry
                        placeholder='Введите ваш пароль'
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                        textStyle={styles.inputFormText}
                      />
                    </View>

                    <View style={styles.signUpInput}>
                      <Text style={styles.signUpInputLabel}>Подтвердите пароль</Text>
                      <Input
                        secureTextEntry
                        placeholder='Введите пароль еще раз'
                        onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                        value={this.state.confirmPassword}
                        textStyle={styles.inputFormText}
                      />
                    </View>
                  </View>

                  <View>{this.renderButton()}</View>
                </View>
              </KeyboardAvoidingView>
              <View style={styles.bottomArea}>
                <View style={styles.haveAccArea}>
                  <Text style={styles.haveAccQuestion}>Уже есть аккаунт? </Text>
                  <TouchableOpacity onPress={() => Actions.pop()}>
                    <Text style={styles.enterText}>Войти</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Animated.View>
        : this.renderPost()}
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    color: 'red',
    alignSelf: 'center',
  },
  mainView: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: '#fff',
  },
  createAccButton: {
    width: SCREEN_WIDTH * 0.75,
    borderWidth: 0.6,
    borderColor: 'transparent',
    backgroundColor: '#2AD2AC',
    height: SCREEN_HEIGHT / 13,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  createAccText: {
    fontSize: 20,
    color: '#fff'
  },
  signUpLabel: {
    fontSize: 27,
    alignSelf: 'center',
    marginVertical: 20,
    color: '#2AD2AC'
  },
  signUpForm: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  signUpInput: {
    marginVertical: 15
  },
  signUpInputLabel: {
    alignSelf: 'flex-start',
    fontSize: 15,
    color: '#000'
  },
  passwordConstraint: {
    marginLeft: 20,
    fontSize: 11,
    fontStyle: 'italic'
  },
  bottomArea: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  haveAccArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  haveAccQuestion: {
    color: '#727272',
    fontSize: 15,
  },
  enterText: {
    color: '#2AD2AC',
    fontSize: 17,
    textDecorationLine: 'underline'
  },
  inputFormText: {
    width: SCREEN_WIDTH * 0.77,
  }
});

const mapStateToProps = ({ auth }) => {
  const { email, password, firstName, lastName, error, loading, sent } = auth;
  return { email, password, firstName, lastName, error, loading, sent };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, registerUser, firstNameChanged, lastNameChanged
})(Register);
