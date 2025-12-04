// Strategy pattern: different queue ordering algorithms
class FifoStrategy { next(tokens) { return tokens.find(t => t.status === 'waiting') || null; } }

class PriorityStrategy {
  next(tokens) {
    const waiting = tokens.filter(t => t.status === 'waiting');
    if (!waiting.length) return null;
    waiting.sort((a,b) => (b.priority||0) - (a.priority||0));
    return waiting[0];
  }
}

class QueueManager {
  constructor(strategy) { this.strategy = strategy; this.tokens = []; }
  setStrategy(s) { this.strategy = s; }
  addToken(token) { this.tokens.push(token); }
  getNext() { return this.strategy.next(this.tokens); }
}

module.exports = { FifoStrategy, PriorityStrategy, QueueManager };
