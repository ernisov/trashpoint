import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  AsyncStorage,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  emailChanged,
  passwordChanged,
  loginUser,
  errorShowed,
} from '../actions';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../variables';

// Components Import
import {
  Screen,
  Button,
  Input,
  Spinner,
} from './common';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      disabled: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('LoggedInWithEmail').then(LoggedInWithEmail => {
      this.props.emailChanged(LoggedInWithEmail);
    });
    if (this.props.email === '' || this.props.password === '') {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  }

// EVENTS
  onEmailChange(text) {
    const { email, password } = this.props;
    this.props.emailChanged(text);

    if (email === '' || password === '' || text === '') {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  }

  onPasswordChange(text) {
    const { email, password } = this.props;
    this.props.passwordChanged(text);

    if (email === '' || password === '' || text === '') {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
    this.setState({ loading: false });
  }

// RENDERS
  renderButton() {
    if (this.props.loading || this.state.loading) {
      return <View style={styles.spinner}><Spinner /></View>;
    }
    return (
      <Button
        style={styles.button}
        onPress={this.onButtonPress.bind(this)}
        disabled={this.state.disabled}
        text='Войти'
        textStyle={styles.textStyle}
      />
    );
  }

  render() {
    if (this.props.error === 'Authentication Failed') {
      Alert.alert(
        'Попробуйте еще раз!',
        'Неправильно введен email или пароль',
        [
          { text: 'Ok' },
        ]
      );
      this.props.errorShowed();
      if (this.props.email === '' || this.props.password === '') {
        this.setState({ disabled: true });
      } else {
        this.setState({ disabled: false });
      }
    }

      return (
        <Screen>
          <Animated.View style={styles.animatedView}>

          <KeyboardAvoidingView behavior='position'>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
            />

            <View style={styles.inputSection}>
              <Input
                placeholder='Ваша почта'
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
                textStyle={styles.inputFormText}
              />
              <Input
                placeholder='Пароль'
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
                secureTextEntry
                textStyle={styles.inputFormText}
              />
            </View>

            <View>{this.renderButton()}</View>
          </KeyboardAvoidingView>

            <View style={styles.bottomArea}>
              <View style={styles.forgotPasswordArea}>
                <Text style={styles.forgotPasswordQuestion}>Забыли пароль?</Text>
              </View>

              <View style={styles.orArea}>
                <View style={styles.orLineLeft} />
                <Text style={styles.orText}>или</Text>
                <View style={styles.orLineRight} />
              </View>

              <View style={styles.dontHaveAccArea}>
                <Text style={styles.dontHaveAcc}>Еще нет аккаунта? </Text>
                <TouchableOpacity onPress={() => Actions.register()} >
                  <Text style={styles.registerButton}>Зарегистрироваться</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </Screen>
      );
  }
}

const styles = StyleSheet.create({
  button: {
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_HEIGHT / 13,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  animatedView: {
    flex: 1,
    opacity: 1,
  },
  logo: {
    marginTop: SCREEN_HEIGHT * 0.2,
    alignSelf: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 9,
  },
  inputSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  spinner: {
    marginTop: 30,
    height: 40,
  },
  textStyle: {
    fontSize: 20,
  },
  registerButton: {
    color: '#2AD2AC',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  bottomArea: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  forgotPasswordArea: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  forgotPasswordQuestion: {
    color: '#2AD2AC',
    fontSize: 15,
  },
  orArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orLineLeft: {
    height: 1,
    marginRight: 10,
    width: 90,
    borderBottomWidth: 1,
    borderColor: '#727272',
  },
  orLineRight: {
    height: 1,
    marginLeft: 10,
    width: 90,
    borderBottomWidth: 1,
    borderColor: '#727272',
  },
  orText: {
    color: '#727272',
    fontSize: 13,
  },
  dontHaveAccArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  dontHaveAcc: {
    color: '#727272',
    fontSize: 13,
  },
  inputFormText: {
    width: SCREEN_WIDTH * 0.77
  }
});

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
  errorShowed,
})(LoginForm);