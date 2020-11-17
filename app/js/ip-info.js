(function () {
    const globalUtils = window.utils;

    class Iti {
        _utilsPath = `/wp-content/themes/ux-mind-school/js/utils.js`;
        _itiOptionsData = {
            nationalMode: true,
            autoHideDialCode: false,
            autoPlaceholder: 'aggressive',
            separateDialCode: true,
            preferredCountries: ['by', 'ru', 'ua'],
            initialCountry: 'auto',
            geoIpLookup: (success, failure) => {
                const date = new Date();
                const dateString = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                const localStorageData = JSON.parse(localStorage.getItem('ums-country-code'));
                if (localStorageData) {
                    if (localStorageData.date != dateString) {
                        jQuery.when(this.getCustomerIpInfo()).then((resp) => {
                            const countryData = JSON.parse(resp);
                            if (countryData) {
                                const countyValue = countryData.country;
                                success(countyValue);
                                localStorage.setItem('ums-country-code', JSON.stringify({
                                    date: dateString,
                                    value: countyValue
                                }));
                            } else {
                                failure(countryData.country);
                            }
                        });
                    } else {
                        success(localStorageData.value);
                    }
                } else {
                    jQuery.when(this.getCustomerIpInfo()).then((resp) => {
                        const countryData = JSON.parse(resp);
                        if (countryData) {
                            const countyValue = countryData.country;
                            success(countyValue);
                            localStorage.setItem('ums-country-code', JSON.stringify({
                                date: dateString,
                                value: countyValue
                            }));
                        } else {
                            failure(countryData.country);
                        }
                    });
                }
            },
            utilsScript: this._utilsPath,
            customPlaceholder: (selectedCountryPlaceholder) => {
                const customPlaceholder = selectedCountryPlaceholder.replace(/[0-9]/g, '_');
                const customMask = selectedCountryPlaceholder.replace(/[0-9]/g, 9);
                const customMaskObject = new Inputmask(customMask, {
                    showMaskOnHover: false,
                    greedy: false
                });
                customMaskObject.mask(this._el);
                return customPlaceholder;
            }
        }

        init(rootElement) {
            this._el = rootElement;
            window.intlTelInput(this._el, this._itiOptionsData);
        }
        getCustomerIpInfo() {
            const customerRequestData = {
                action: 'ip_info'
            }
            return globalUtils.ajaxRequest(customerRequestData);
        }
    }

    const itiInstance = new Iti();
    window.iti = {
        instance: itiInstance
    }
})();