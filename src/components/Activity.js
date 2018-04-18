import _ from 'lodash';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { markersFetch, contributionsFetch } from '../actions';
import { MarkerItem } from './activity';

// Components Import
import {
  Screen,
} from './common';

class Activity extends Component {
  componentWillMount() {
    this.props.markersFetch();
    this.props.contributionsFetch();
  }

  // renderRow(marker) {
  //   return <MarkerItem marker={marker} />;
  // }

  render() {
    return(
      <Screen scrollable style={{flex: 1}}>
        <Text>asdf</Text>
        <FlatList
          data={this.props.activities}
          renderItem={({ marker }) => (
            <MarkerItem marker={marker} />
          )}
          keyExtractor = {(marker) => marker.id}
        />
      </Screen>
    )
  }
}

const styles = StyleSheet.create({

});

const mapStateToProps = (state) => {
  const activities = _.map(state.activity, (val, uid) => {
    return { ...val, uid };
  });

  return { activities }
};

export default connect(mapStateToProps, { markersFetch, contributionsFetch })(Activity);