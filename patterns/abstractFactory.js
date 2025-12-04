// Abstract Factory: Department-specific token and notification templates

class QueueToken {
  constructor({ tokenId, studentId, deptId, reason }) {
    this.tokenId = tokenId;
    this.studentId = studentId;
    this.deptId = deptId;
    this.reason = reason;
    this.status = 'waiting';
    this.timeJoined = new Date();
  }
}

class NotificationTemplate {
  constructor({ deptName, format }) {
    this.deptName = deptName;
    this.format = format;
  }
  render(token, student) {
    if (this.format === 'short') return `${this.deptName}: Token #${token.tokenId} for ${student.name}`;
    return `${this.deptName} Queue — Token #${token.tokenId}\nStudent: ${student.name}\nReason: ${token.reason}\nJoined: ${token.timeJoined.toLocaleTimeString()}`;
  }
}

class DeptFactory {
  createToken(studentId, deptId, reason) { }
  createNotificationTemplate() { }
}

class RegistrarFactory extends DeptFactory {
  createToken(studentId, deptId, reason) {
    return new QueueToken({ tokenId: `REG-${Date.now() % 10000}`, studentId, deptId, reason });
  }
  createNotificationTemplate() {
    return new NotificationTemplate({ deptName: 'Registrar', format: 'detailed' });
  }
}

class FinanceFactory extends DeptFactory {
  createToken(studentId, deptId, reason) {
    return new QueueToken({ tokenId: `FIN-${Date.now() % 10000}`, studentId, deptId, reason });
  }
  createNotificationTemplate() {
    return new NotificationTemplate({ deptName: 'Finance', format: 'short' });
  }
}

module.exports = { QueueToken, NotificationTemplate, RegistrarFactory, FinanceFactory };
