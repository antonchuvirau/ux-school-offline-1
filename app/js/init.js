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
    hidden: true,
    name: `installment`,
    title: `Рассрочка от&nbsp;Альфа-банка`,
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
const INSTALLMENT_TERM = 6;
const INSTALLMENT_TEST_SHOP_ID = `1374`;
const INSTALLMENT_SHOP_ID = `1403`;
const RAND_BASE = 36;
const START_RAND_SUBSTR_INDEX = 2;
const END_RAND_SUBSTR_INDEX = 5;