const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode: 'sandbox',
    client_id: 'Aa4T0aHz6yQ5MzyUQMWWtFBHkFi7e066RnFXG0yEWf3ifeTIcqUW7uSekMLt9-LJ9R08oivJiq1Ip6Fn',
    client_secret: 'EECUMXL1TklvgbhNlhXc2Vwd5AtOZ2hVhBfV8NgKkkDE3YDDwhPSbOEQapc-_evnf1MMJH-KTYFYyqzA',
});

module.exports = paypal;