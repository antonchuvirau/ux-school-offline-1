'use strict';

// Constants
const PAYMENT_METHODS_DATA = [{
    id: 0,
    name: `erip`,
    title: `ЕРИП оплата&nbsp;в&nbsp;2&nbsp;этапа`,
    checked: false
},
{
    id: 4,
    name: `installment`,
    title: `Кредит от&nbsp;Альфа&nbsp;банка до&nbsp;12&nbsp;месяцев`,
    checked: false
},
{
    id: 1,
    name: `halva`,
    title: `Рассрочка от 2 до 9 месяцев по карте Халва`,
    checked: false
},
{
    id: 2,
    name: `offline`,
    title: `В отделении банка`,
    checked: false
},
{
    id: 3,
    name: `online`,
    title: `Оплатить картой`,
    checked: false
}];
const INSTALLMENT_TERM = 12;
const INSTALLMENT_RATE = 13;
const INSTALLMENT_TEST_SHOP_ID = `1374`;
const INSTALLMENT_SHOP_ID = `1403`;
const RAND_BASE = 36;
const START_RAND_SUBSTR_INDEX = 2;
const END_RAND_SUBSTR_INDEX = 5;