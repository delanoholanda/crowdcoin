import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';
import { parseISO, isAfter } from 'date-fns';
import moment from "moment";

class RequestRow extends Component {

    state = {
        loading: false,
        timeBefore: '',
        timeAfter: '',
        time: ''
    };

    onApprove = async () => {
        const campaign = Campaign(this.props.address);

        const accounts = await web3.eth.getAccounts();

        this.setState({ loading: true });
        this.setState({ timeBefore: moment() });
        await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        });
        this.setState({ timeAfter: moment() });

        var horas = this.state.timeAfter.diff(this.state.timeBefore, 'hours');
        var minutos = this.state.timeAfter.diff(this.state.timeBefore, 'minutes');
        var segundos= this.state.timeAfter.diff(this.state.timeBefore, 'seconds');
        var diferenca = `${horas}:${minutos}:${segundos}`;
        console.log('Tempo da transação: ' + diferenca);

        this.setState({ loading: false });

        Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    }

    onFinalize = async () => {
        const campaign = Campaign(this.props.address);

        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        });
    }

    render() {
        const { Row, Cell } = Table;
        const { id, request, approversCount } = this.props;
        const readyToFinalize = request.approvalCount > approversCount / 2;

        return (
            <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
                <Cell>{id+1}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{approversCount}</Cell>
                <Cell>
                    {request.complete ? null : (
                        <Button color="green" onClick={this.onApprove} loading={this.state.loading}>Approve</Button>
                    )}
                </Cell>
                <Cell>
                    {request.complete ? null : (
                        <Button color="teal" onClick={this.onFinalize}>Finalize</Button>
                    )}
                </Cell>
            </Row>
        );
    }
}

export default RequestRow;
