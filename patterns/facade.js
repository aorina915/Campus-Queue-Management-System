// Facade pattern: unified interface for sending notifications
class NotificationService {
  constructor() { this.senders = []; this.log = []; }
  registerSender(adapter) { this.senders.push(adapter); }
  async send(recipient, message) {
    const results = [];
    for (const s of this.senders) {
      try {
        const r = await s.send(recipient, message);
        results.push(r);
        this.log.push({ to: recipient, message, result: r, time: new Date() });
      } catch (e) { this.log.push({ to: recipient, message, error: e.message, time: new Date() }); }
    }
    return results;
  }
}

module.exports = NotificationService;
