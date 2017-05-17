
// export function outerHeight (el) {
//     let height = 0;
//     if (el) {
//         let style = null;
//         height = el.offsetHeight;
//         style = getComputedStyle(el);
//         height += parseInt(style.marginTop) + parseInt(style.marginBottom);
//     }
//     return height;
// }

export function lowerFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

/**
 * Utils.
 */
const Utils = {
    recursionFlag: false,

    logN: function(x, base){
        return Math.log(x) / Math.log(base);
    },
    calcAnnuitet: function(rate, duration){
        rate = rate / 1200;
        return (rate * Math.pow(1 + rate, duration)) / (Math.pow(1 + rate, duration) - 1);
    },
    calcDuration: function(summ, monthly, rate){
        rate = rate / 1200;
        if (monthly - summ * rate <= 0) return 1000000;
        return this.logN(monthly / (monthly - summ * rate), 1 + rate);
    },
    reCalcSum: function(){
        this._settings.credSumSlider.slider(
            "value",
            this._settings.monthPaymentSlider.slider("value") / this.calcAnnuitet(this._settings.credRateSlider.slider("value"),
            this._settings.credDurationSlider.slider("value"))
        );
    },
    reCalcDuration: function(){
        this._settings.credDurationSlider.slider(
            "value",
            this.calcDuration(
                this._settings.credSumSlider.slider("value"),
                this._settings.monthPaymentSlider.slider("value"),
                this._settings.credRateSlider.slider("value")
            )
        );
    },
    reCalcMonthPayment: function(){
        this._settings.monthPaymentSlider.slider(
            "value",
            this._settings.credSumSlider.slider("value") * this.calcAnnuitet(
                this._settings.credRateSlider.slider("value"),
                this._settings.credDurationSlider.slider("value")
            )
        );
    },
    setSliderStatus: function (condition) {
        return condition ? 'disable' : 'enable';
    }
}

export default Utils;
