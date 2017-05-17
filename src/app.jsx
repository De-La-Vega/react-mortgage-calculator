import React from 'react';
import '../styles/index.scss';

import MortgageCalculator, {Section} from "./MortgageCalculator";

export default class App extends React.Component {
    render() {
        return (
            <div className="container container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <h1 className="page-header">
                            Ипотечный калькулятор
                        </h1>
                    </div>
                </div>

                <div className="form-horizontal">
                    <div className="row">

                        <MortgageCalculator
                            logEvents
                            inputClassName="form-control"
                        >
                            <Section
                                type="ApartmentPrice"
                                render={(input, slider) => {
                                    return (
                                        <div className="col-xs-12 col-sm-4 col-md-4 section-col">
                                            <div className="section-title">Стоимость квартиры, руб.</div>
                                            <div className="section-input">{input}</div>
                                            <div className="section-slider">{slider}</div>
                                        </div>
                                    )
                                }}
                            />

                            <Section
                                type="FirstPayment"
                                render={(input, slider) => {
                                    return (
                                        <div className="col-xs-12 col-sm-4 col-md-4 section-col">
                                            <div className="section-title">Первоначальный взнос, руб.</div>
                                            <div className="section-input">{input}</div>
                                            <div className="section-slider">{slider}</div>
                                        </div>
                                    )
                                }}
                            />

                            <Section
                                type="CreditSum"
                                render={(input, slider, checkbox) => {
                                    return (
                                        <div className="col-xs-12 col-sm-4 col-md-4 section-col">
                                            <div className="section-title">Сумма кредита (руб.)</div>
                                            <div className="section-input">{input}</div>
                                            <div className="section-slider">{slider}</div>
                                            <div className="section-checkbox"><label>{checkbox} <small>Зафиксировать</small></label></div>
                                        </div>
                                    )
                                }}
                            />

                            <Section
                                type="CreditDuration"
                                render={(input, slider, checkbox) => {
                                    return (
                                        <div className="col-xs-12 col-sm-4 col-md-4 section-col">
                                            <div className="section-title">Срок кредита, мес</div>
                                            <div className="section-input">{input}</div>
                                            <div className="section-slider">{slider}</div>
                                            <div className="section-checkbox"><label>{checkbox} <small>Зафиксировать</small></label></div>
                                        </div>
                                    )
                                }}
                            />

                            <Section
                                type="CreditRate"
                                render={(input, slider) => {
                                    return (
                                        <div className="col-xs-12 col-sm-4 col-md-4 section-col">
                                            <div className="section-title">Ставка, %</div>
                                            <div className="section-input">{input}</div>
                                            <div className="section-slider">{slider}</div>
                                        </div>
                                    )
                                }}
                            />

                            <Section
                                type="MonthlyPayment"
                                render={(input, slider, checkbox) => {
                                    return (
                                        <div className="col-xs-12 col-sm-4 col-md-4 section-col">
                                            <div className="section-title">Ежемесячный платеж, руб.</div>
                                            <div className="section-input">{input}</div>
                                            <div className="section-slider">{slider}</div>
                                            <div className="section-checkbox"><label>{checkbox} <small>Зафиксировать</small></label></div>
                                        </div>
                                    )
                                }}
                            />
                        </MortgageCalculator>

                    </div>
                </div>
            </div>
        )
    }
}
