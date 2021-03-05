/**
 * @format
 */


import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import Task from './src/db/Task'
import { mySchema } from './src/db/schema';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { Database } from '@nozbe/watermelondb';

const adapter = new SQLiteAdapter({
  dbName: 'BadTodo',
  schema: mySchema,
})

const database = new Database({
  adapter,
  modelClasses: [Task],
  actionsEnabled: true,
})


const AppWrapper = (props) => {
  return <App {...{
    ...props,
    database: database,
  }}/>;
};

AppRegistry.registerComponent(appName, () => AppWrapper);
