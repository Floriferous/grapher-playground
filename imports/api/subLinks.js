import { Mongo } from 'meteor/mongo';
import Links from './links';

export default (SubLinks = new Mongo.Collection('subLinks'));
