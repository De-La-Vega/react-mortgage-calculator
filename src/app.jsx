import React from 'react';
import '../styles/index.scss';

import MortgageCalculator, {Section} from "./MortgageCalculator";

const LABEL = {
    apartmentPrice: 'Стоимость квартиры (руб.)',
    firstPayment: 'Первоначальный взнос (руб.)',
    creditSum: 'Сумма кредита (руб.)',
    creditDuration: 'Срок кредита (мес.)',
    creditRate: 'Ставка (%)',
    monthlyPayment: 'Ежемесячный платеж (руб.)'
}

function beautifyAmount (value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            form: {}
        }
    }
    setResults (form = {}) {
        this.setState({form});
    }

    render() {
        const {form} = this.state;

        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">Ипотечный калькулятор</a>
                        </div>
                        <div id="navbar" className="collapse navbar-collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="#">Об авторе</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <main className="container container-fluid">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Рассчитать:</h3>
                        </div>
                        <div className="panel-body">
                            <div className="form-horizontal">
                                <div className="row">

                                    <MortgageCalculator
                                        inputClassName="form-control"
                                        getResults={(results) => this.setResults(results)}
                                    >
                                        <Section
                                            type="apartmentPrice"
                                            render={(input, slider) => {
                                                return (
                                                    <div className="col-xs-12 col-sm-4 col-md-4 section-col">
                                                        <div className="section-title">{LABEL.apartmentPrice}</div>
                                                        <div className="section-input">{input}</div>
                                                        <div className="section-slider">{slider}</div>
                                                    </div>
                                                )
                                            }}
                                        />

                                        <Section
                                            type="firstPayment"
                                            render={(input, slider) => {
                                                return (
                                                    <div className="col-xs-12 col-sm-4 col-md-4 section-col">
                                                        <div className="section-title">{LABEL.firstPayment}</div>
                                                        <div className="section-input">{input}</div>
                                                        <div className="section-slider">{slider}</div>
                                                    </div>
                                                )
                                            }}
                                        />

                                        <Section
                                            type="creditSum"
                                            render={(input, slider, checkbox) => {
                                                return (
                                                    <div className="col-xs-12 col-sm-4 col-md-4 section-col">
                                                        <div className="section-title">{LABEL.creditSum}</div>
                                                        <div className="section-input">{input}</div>
                                                        <div className="section-slider">{slider}</div>
                                                        <div className="section-checkbox"><label>{checkbox} <small>Зафиксировать</small></label></div>
                                                    </div>
                                                )
                                            }}
                                        />

                                        <Section
                                            type="creditDuration"
                                            render={(input, slider, checkbox) => {
                                                return (
                                                    <div className="col-xs-12 col-sm-4 col-md-4 section-col">
                                                        <div className="section-title">{LABEL.creditDuration}</div>
                                                        <div className="section-input">{input}</div>
                                                        <div className="section-slider">{slider}</div>
                                                        <div className="section-checkbox"><label>{checkbox} <small>Зафиксировать</small></label></div>
                                                    </div>
                                                )
                                            }}
                                        />

                                        <Section
                                            type="creditRate"
                                            render={(input, slider) => {
                                                return (
                                                    <div className="col-xs-12 col-sm-4 col-md-4 section-col">
                                                        <div className="section-title">{LABEL.creditRate}</div>
                                                        <div className="section-input">{input}</div>
                                                        <div className="section-slider">{slider}</div>
                                                    </div>
                                                )
                                            }}
                                        />

                                        <Section
                                            type="monthlyPayment"
                                            render={(input, slider, checkbox) => {
                                                return (
                                                    <div className="col-xs-12 col-sm-4 col-md-4 section-col">
                                                        <div className="section-title">{LABEL.monthlyPayment}</div>
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
                    </div>

                    {
                        Object.keys(form).length > 0 && (
                            <div className="panel panel-success">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Результаты:</h3>
                                </div>
                                <ul className="list-group">
                                    <li className="list-group-item">{LABEL.apartmentPrice}: <strong>{beautifyAmount(form.apartmentPrice)}</strong></li>
                                    <li className="list-group-item">{LABEL.firstPayment}: <strong>{beautifyAmount(form.firstPayment)}</strong></li>
                                    <li className="list-group-item">{LABEL.creditSum}: <strong>{beautifyAmount(form.creditSum)}</strong></li>
                                    <li className="list-group-item">{LABEL.creditDuration}: <strong>{beautifyAmount(form.creditDuration)}</strong></li>
                                    <li className="list-group-item">{LABEL.creditRate}: <strong>{beautifyAmount(form.creditRate)}</strong></li>
                                    <li className="list-group-item">{LABEL.monthlyPayment}: <strong>{beautifyAmount(form.monthlyPayment)}</strong></li>
                                </ul>
                            </div>
                        )
                    }
                </main>

                <footer className="footer">
                    <div className="container">
                        <p className="text-muted">Ипотечный калькулятор &copy; 2017</p>
                    </div>
                </footer>
            </div>
        )
    }
}
