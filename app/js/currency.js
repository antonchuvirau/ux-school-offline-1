(function() {
    const utils = window.utils;
    class Currency {
        _usdRate;
        _rubRate;

        constructor() {
            this.getCurrencyRatesData();
        }

        setUsdRateValue(value) {
            this._usdRate = value;
        }
        getUsdRateValue() {
            return this._usdRate;
        }
        setRubRateValue(value) {
            this._rubRate = value;
        }
        getRubRateValue() {
            return this._rubRate;
        }

        getCurrencyRatesData() {
            const currencyRequestData = {
                action: `currencies`
            };
            jQuery.when(utils.ajaxRequest(currencyRequestData)).then(resp => {
                const currencyData = JSON.parse(resp);
                const resultData = currencyData.filter(item => item['Cur_Abbreviation'] === 'USD' || item['Cur_Abbreviation'] === 'RUB');
                this.setCurrencyRates(resultData);
            }, error => {
                console.log(new Error(error));
            });
        }
        setCurrencyRates(ratesData) {
            const [usdData, rubData] = ratesData;
            this.setUsdRateValue(usdData['Cur_OfficialRate']);
            this.setRubRateValue(rubData['Cur_OfficialRate'] / 100);
        }
    }

    const currencyInstance = new Currency();
})();