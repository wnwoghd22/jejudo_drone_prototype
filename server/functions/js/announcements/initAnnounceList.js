import { user } from 'firebase-functions/lib/providers/auth';
import admin from '../../index.js';
import app from '../app.js';

function initAnnounceList() {
    let listRef = admin.database().ref('announcements');

    //temporary
    
}