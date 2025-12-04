// Demo wiring all patterns together
const { RegistrarFactory, FinanceFactory } = require('./patterns/abstractFactory');
const NotificationBuilder = require('./patterns/builder');
const { TwilioClientMock, NexmoClientMock, TwilioAdapter, NexmoAdapter } = require('./patterns/adapter');
const NotificationService = require('./patterns/facade');
const { FifoStrategy, PriorityStrategy, QueueManager } = require('./patterns/strategy');
const queueEvents = require('./patterns/observer');

(async function demo() {
  console.log('=== CampusQueueP Patterns Demo ===');

  // Abstract Factory
  const regFactory = new RegistrarFactory();
  const finFactory = new FinanceFactory();
  const alice = { id: 'stu1', name: 'Alice' };
  const bob = { id: 'stu2', name: 'Bob' };
  const token1 = regFactory.createToken(alice.id, 'Registrar', 'Transcript');
  const token2 = finFactory.createToken(bob.id, 'Finance', 'Fee Payment');
  token2.priority = 5;

  // Builder
  const builder = new NotificationBuilder();
  const notif = builder
    .to(alice.id)
    .subject('Queue Joined')
    .bodyText(regFactory.createNotificationTemplate().render(token1, alice))
    .build();

  // Adapter + Facade
  const notifService = new NotificationService();
  notifService.registerSender(new TwilioAdapter(new TwilioClientMock()));
  notifService.registerSender(new NexmoAdapter(new NexmoClientMock()));
  await notifService.send(notif.to, notif.body);

  // Observer
  queueEvents.on('tokenCreated', (t) => console.log('[Observer] tokenCreated', t.tokenId));
  queueEvents.emit('tokenCreated', token1);
  queueEvents.emit('tokenCreated', token2);

  // Strategy
  const qm = new QueueManager(new FifoStrategy());
  qm.addToken(token1);
  qm.addToken(token2);
  console.log('FIFO next token:', qm.getNext()?.tokenId);
  qm.setStrategy(new PriorityStrategy());
  console.log('Priority next token:', qm.getNext()?.tokenId);
})();
