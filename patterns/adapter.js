// Adapter pattern: wrap external messaging clients to a common interface

class NotifierAdapter {
  send(to, message) { throw new Error('Not implemented'); }
}

// Mock clients
class TwilioClientMock { twilioSendSMS(to, text) { return Promise.resolve(`[TwilioMock] Sent to ${to}: ${text}`); } }
class NexmoClientMock { sendText({ to, message }) { return Promise.resolve(`[NexmoMock] Sent to ${to}: ${message}`); } }

// Adapters
class TwilioAdapter extends NotifierAdapter {
  constructor(client) { super(); this.client = client; }
  send(to, message) { return this.client.twilioSendSMS(to, message); }
}

class NexmoAdapter extends NotifierAdapter {
  constructor(client) { super(); this.client = client; }
  send(to, message) { return this.client.sendText({ to, message }); }
}

module.exports = { NotifierAdapter, TwilioAdapter, NexmoAdapter, TwilioClientMock, NexmoClientMock };
