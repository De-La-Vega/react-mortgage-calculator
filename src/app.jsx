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

                        <MortgageCalculator>
                            <Section
                                type="ApartmentPrice"
                                render={(input, slider) => {
                                    return (
                                        <div className="col-xs-12 col-sm-4 col-md-4">
                                            <div>Стоимость квартиры, руб.</div>
                                            <div>{input}</div>
                                            <div>{slider}</div>
                                        </div>
                                    )
                                }}
                            />

                            <Section
                                type="FirstPayment"
                                render={(input, slider) => {
                                    return (
                                        <div className="col-xs-12 col-sm-4 col-md-4">
                                            <div>Первоначальный взнос, руб.</div>
                                            <div>{input}</div>
                                            <div>{slider}</div>
                                        </div>
                                    )
                                }}
                            />

                            <Section
                                type="CreditSum"
                                render={(input, slider, checkbox) => {
                                    return (
                                        <div className="col-xs-12 col-sm-4 col-md-4">
                                            <div>Сумма кредита (руб.)</div>
                                            <div>{input}</div>
                                            <div>{slider}</div>
                                            <div><label>{checkbox} <small>Зафиксировать</small></label></div>
                                        </div>
                                    )
                                }}
                            />

                            <Section
                                type="CreditDuration"
                                render={(input, slider, checkbox) => {
                                    return (
                                        <div className="col-xs-12 col-sm-4 col-md-4">
                                            <div>Срок кредита, мес</div>
                                            <div>{input}</div>
                                            <div>{slider}</div>
                                            <div><label>{checkbox} <small>Зафиксировать</small></label></div>
                                        </div>
                                    )
                                }}
                            />

                            <Section
                                type="CreditRate"
                                render={(input, slider) => {
                                    return (
                                        <div className="col-xs-12 col-sm-4 col-md-4">
                                            <div>Ставка, %</div>
                                            <div>{input}</div>
                                            <div>{slider}</div>
                                        </div>
                                    )
                                }}
                            />

                            <Section
                                type="MonthlyPayment"
                                render={(input, slider, checkbox) => {
                                    return (
                                        <div className="col-xs-12 col-sm-4 col-md-4">
                                            <div>Ежемесячный платеж, руб.</div>
                                            <div>{input}</div>
                                            <div>{slider}</div>
                                            <div><label>{checkbox} <small>Зафиксировать</small></label></div>
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
