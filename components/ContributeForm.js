import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';
import { parseISO, isAfter } from 'date-fns';
import moment from "moment";

class ContributeForm extends Component {

    state = {
        value: '',
        errorMessage: '',
        loading: false,
        timeBefore: '',
        timeAfter: '',
        time: ''
    };

    onSubmit = async (event) => {
        event.preventDefault();

        const campaign = Campaign(this.props.address);

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            this.setState({ timeBefore: moment() });
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });
            this.setState({ timeAfter: moment() });

            Router.pushRoute(`/campaigns/${this.props.address}`);
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        // console.log(this.state.timeAfter);
        // console.log(this.state.timeBefore);
        // const d = this.state.timeAfter - this.state.timeBefore;
        var horas = this.state.timeAfter.diff(this.state.timeBefore, 'hours');
        var minutos = this.state.timeAfter.diff(this.state.timeBefore, 'minutes');
        var segundos= this.state.timeAfter.diff(this.state.timeBefore, 'seconds');
        var diferenca = `${horas}:${minutos}:${segundos}`;
        console.log('Tempo da transação: ' + diferenca);
        this.setState({ loading: false, value: '' });
        this.setState({ time: diferenca });
    };

    render() {
        let tempo_transacao = this.state.time != '' ? <label>Tempo de Transação: {this.state.time} </label> : null;
        return (
            <div>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({ value: event.target.value })}
                        label="ether"
                        labelPosition="right" />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button primary loading={this.state.loading}>Contribute!</Button>
            </Form>
            {tempo_transacao}
            </div>
        );
    }
}

export default ContributeForm;
