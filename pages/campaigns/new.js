import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import { parseISO, isAfter } from 'date-fns';
import moment from "moment";

class CampaignNew extends Component {
    state = {
        minimunContribuition: '',
        errorMessage: '',
        loading: false,
        timeBefore: '',
        timeAfter: ''
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage : '' });

        try {
            const accounts = await web3.eth.getAccounts();
            this.setState({ timeBefore: moment() });
            await factory.methods
            .createCampaign(this.state.minimunContribuition)
            .send({
                from: accounts[0]
            });
            this.setState({ timeAfter: moment() });

            Router.pushRoute('/');
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        var horas = this.state.timeAfter.diff(this.state.timeBefore, 'hours');
        var minutos = this.state.timeAfter.diff(this.state.timeBefore, 'minutes');
        var segundos= this.state.timeAfter.diff(this.state.timeBefore, 'seconds');
        var diferenca = `${horas}:${minutos}:${segundos}`;
        console.log('Tempo da transação: ' + diferenca);

        this.setState({ loading: false });

    };

    render() {
        return (
            <Layout>
                <h3>Create a Campaign</h3>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input
                            label="wei"
                            labelPosition="right"
                            value={this.state.minimunContribuition}
                            onChange={event =>
                                this.setState({ minimunContribuition: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary>
                        Create!
                    </Button>
                </Form>

            </Layout>
        );
    }
}


export default CampaignNew;
