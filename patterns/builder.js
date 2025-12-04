// Builder pattern: construct notifications step-by-step

class NotificationBuilder {
  constructor() { this.reset(); }
  reset() { this._notif = { to: null, subject: null, body: '', meta: {} }; return this; }
  to(recipient) { this._notif.to = recipient; return this; }
  subject(s) { this._notif.subject = s; return this; }
  bodyText(text) { this._notif.body += text + '\n'; return this; }
  addMeta(key, value) { this._notif.meta[key] = value; return this; }
  build() { const result = this._notif; this.reset(); return result; }
}

module.exports = NotificationBuilder;
