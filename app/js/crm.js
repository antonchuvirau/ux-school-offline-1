(function() {
    class Crm {
        constructor(id, formData, actionName) {
            this.id = id;
            this.formData = formData;
            this.actionName = actionName;
        }

        getRequestObject() {
            return {
                action: `amo_crm_${this.actionName}`,
                data: this.getFormData()
            }
        }

        getFormData() {
            if (this.id === 131) {
                return {
                    title: this.getFormValue(4) + ', ' + this.getFormValue(13),
                    price: +this.getFormValue(5),
                    name: this.getFormValue(0),
                    type: this.getFormValue(6),
                    time: this.getFormValue(7),
                    date: +this.getFormValue(8),
                    address: this.getFormValue(9),
                    statusId: +this.getFormValue(11),
                    customer: {
                        name: this.getFormValue(13),
                        email: this.getFormValue(15),
                        telephone: (this.getFormValue(3) + this.getFormValue(14)).replace(/[^0-9.]/g, "")
                    },
                    tag: {
                        value: this.getFormValue(12)
                    }
                }
            }
            if (this.id === 859) {
                return {
                    name: this.getFormValue(14),
                    customer: {
                        email: this.getFormValue(16),
                        telephone: (this.getFormValue(4) + this.getFormValue(15)).replace(/[^0-9.]/g, "")
                    },
                    intensive: {
                        name: this.getFormValue(5),
                        timestamp: +this.getFormValue(9)
                    },
                    tag: {
                        name: 'Интенсив',
                        value: this.getFormValue(12)
                    }
                }
            }
            if (this.id === 1447) {
                return {
                    customer: {
                        name: this.getFormValue(1),
                        email: this.getFormValue(3),
                        telephone: (this.getFormValue(0) + ' ' + this.getFormValue(2)).replace(/[^0-9.]/g, "")
                    },
                    tag: {
                        name: 'Начни учиться бесплатно'
                    }
                }
            }
            if (this.id === 779) {
                return {
                    customer: {
                        name: this.getFormValue(1),
                        telephone: (this.getFormValue(0) + ' ' + this.getFormValue(2)).replace(/[^0-9.]/g, ""),
                        email: this.getFormValue(3),
                        message: this.getFormValue(4)
                    },
                    tag: {
                        name: 'Обратный звонок'
                    }
                }
            }
            if (this.id === 1839) {
                return {
                    name: this.getFormValue(7),
                    customer: {
                        email: this.getFormValue(8),
                        telephone: (this.getFormValue(3) + this.getFormValue(9)).replace(/[^0-9.]/g, "")
                    },
                    intensive: {
                        name: this.getFormValue(4),
                        timestamp: +this.getFormValue(5)
                    },
                    tag: {
                        name: 'Интенсив',
                        value: this.getFormValue(6)
                    }
                }
            }
        }

        getFormValue(index) {
            return this.formData[index].value;
        }
    }

    window.crm = {
        instance: Crm
    }
})();