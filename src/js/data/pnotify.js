import '@pnotify/core/dist/PNotify.css'
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import { error, notice } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';

function noticeMessage() {
  notice({
    text: "please write a corect name of search!"
  });
}

function errorMessage() {
  error({
    text: "oops, something wrong!"
  });
}

export default {noticeMessage, errorMessage};