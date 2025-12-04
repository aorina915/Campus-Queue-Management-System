// Observer pattern: event-driven queue notifications
const { EventEmitter } = require('events');

class QueueEvents extends EventEmitter {}
const queueEvents = new QueueEvents();

// Export
module.exports = queueEvents;
