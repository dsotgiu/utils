/*converts a base64 value into a file excel*/
const fn= (file64) => window.open('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + file64);
