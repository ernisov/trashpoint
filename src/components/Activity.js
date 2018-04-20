import _ from 'lodash';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { dataset } from '../actions';
import { MarkerItem } from './activities';

// Components Import
import {
  Screen,
} from './common';

class Activity extends Component {
  componentDidMount() {
    this.props.dataset();
  }

  render() {
    console.log(this.props);
    return(
      <Screen scrollable style={{flex: 1}}>
        <FlatList
          data={this.props.data}
          renderItem={({ item }) => (
            <MarkerItem item={item} />
          )}
          keyExtractor = {(item) => item.id}
        />
      </Screen>
    )
  }
}

const styles = StyleSheet.create({

});

const mapStateToProps = (state) => {
  const { data } = state.activity;
  return { data };
};

export default connect(mapStateToProps, { dataset })(Activity);