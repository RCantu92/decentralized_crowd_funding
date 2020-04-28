import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout.js';
import factory from '../../ethereum/factory.js';
import web3 from '../../ethereum/web3.js';

class CampaignNew extends Component {
    state = {
        minmumContribution: '',
        errorMessage: ''
    };

    onSubmit = async (event) => {
        event.preventDefault();

        try{
            const accounts = await web3.eth.getAccounts();
            await factory.methods
            .createCampaign(this.state.minmumContribution)
            .send({
                from: accounts[0]
            });
        } catch(err) {
            this.setState({ errorMessage: err.message });
        }
    };

    render() {
        return (
            <Layout>
                <h3>Create a campaign</h3>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                            label="wei" 
                            labelPosition="right"
                            value={this.state.minmumContribution}
                            onChange={event => this.setState({ minmumContribution: event.target.value })}
                        />
                    </Form.Field>

                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button primary>Create!</Button>
                </Form>
            </Layout>
        );
    };
}

export default CampaignNew;