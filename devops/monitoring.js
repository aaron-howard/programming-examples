/**
 * Monitoring - JavaScript
 * 
 * System and application monitoring:
 * - Metrics collection
 * - Alerting
 * - Logging
 */

// Metrics Collector
class MetricsCollector {
    constructor() {
        this.metrics = new Map();
        this.history = [];
    }
    
    record(metricName, value, tags = {}) {
        const timestamp = Date.now();
        const metric = {
            name: metricName,
            value,
            tags,
            timestamp
        };
        
        if (!this.metrics.has(metricName)) {
            this.metrics.set(metricName, []);
        }
        
        this.metrics.get(metricName).push(metric);
        this.history.push(metric);
        
        return metric;
    }
    
    getMetric(metricName, timeRange = null) {
        const metrics = this.metrics.get(metricName) || [];
        
        if (timeRange) {
            const cutoff = Date.now() - timeRange;
            return metrics.filter(m => m.timestamp >= cutoff);
        }
        
        return metrics;
    }
    
    getAverage(metricName, timeRange = null) {
        const metrics = this.getMetric(metricName, timeRange);
        if (metrics.length === 0) return 0;
        
        const sum = metrics.reduce((acc, m) => acc + m.value, 0);
        return sum / metrics.length;
    }
}

// Alert Manager
class AlertManager {
    constructor() {
        this.rules = [];
        this.triggeredAlerts = [];
    }
    
    addRule(rule) {
        this.rules.push(rule);
    }
    
    check(metricsCollector) {
        for (const rule of this.rules) {
            const value = metricsCollector.getAverage(rule.metric, rule.timeRange);
            
            if (this.evaluateRule(rule, value)) {
                this.triggerAlert(rule, value);
            }
        }
    }
    
    evaluateRule(rule, value) {
        switch (rule.operator) {
            case '>':
                return value > rule.threshold;
            case '<':
                return value < rule.threshold;
            case '>=':
                return value >= rule.threshold;
            case '<=':
                return value <= rule.threshold;
            default:
                return false;
        }
    }
    
    triggerAlert(rule, value) {
        const alert = {
            rule: rule.name,
            metric: rule.metric,
            value,
            threshold: rule.threshold,
            severity: rule.severity,
            timestamp: Date.now()
        };
        
        this.triggeredAlerts.push(alert);
        console.log(`🚨 ALERT: ${rule.name} - ${rule.metric} = ${value.toFixed(2)} (threshold: ${rule.threshold})`);
    }
    
    getAlerts() {
        return this.triggeredAlerts;
    }
}

// Logger
class Logger {
    constructor(level = 'info') {
        this.level = level;
        this.logs = [];
        this.levels = { debug: 0, info: 1, warn: 2, error: 3 };
    }
    
    log(level, message, metadata = {}) {
        if (this.levels[level] >= this.levels[this.level]) {
            const logEntry = {
                level,
                message,
                metadata,
                timestamp: new Date().toISOString()
            };
            
            this.logs.push(logEntry);
            console.log(`[${level.toUpperCase()}] ${message}`, metadata);
        }
    }
    
    debug(message, metadata) {
        this.log('debug', message, metadata);
    }
    
    info(message, metadata) {
        this.log('info', message, metadata);
    }
    
    warn(message, metadata) {
        this.log('warn', message, metadata);
    }
    
    error(message, metadata) {
        this.log('error', message, metadata);
    }
    
    getLogs(level = null) {
        if (level) {
            return this.logs.filter(log => log.level === level);
        }
        return this.logs;
    }
}

// Example usage
console.log('=== Monitoring ===\n');

// Metrics
const metrics = new MetricsCollector();
metrics.record('cpu_usage', 45);
metrics.record('cpu_usage', 50);
metrics.record('cpu_usage', 55);
metrics.record('memory_usage', 70);
metrics.record('memory_usage', 75);

console.log('Metrics:');
console.log(`CPU Usage Average: ${metrics.getAverage('cpu_usage').toFixed(2)}%`);
console.log(`Memory Usage Average: ${metrics.getAverage('memory_usage').toFixed(2)}%`);

// Alerts
const alerts = new AlertManager();
alerts.addRule({
    name: 'High CPU',
    metric: 'cpu_usage',
    operator: '>',
    threshold: 50,
    severity: 'warning',
    timeRange: 60000
});

alerts.addRule({
    name: 'High Memory',
    metric: 'memory_usage',
    operator: '>',
    threshold: 70,
    severity: 'critical',
    timeRange: 60000
});

console.log('\nChecking alerts...');
alerts.check(metrics);

// Logging
console.log('\nLogging:');
const logger = new Logger('info');
logger.info('Application started', { port: 3000 });
logger.warn('High memory usage detected', { usage: 75 });
logger.error('Database connection failed', { error: 'Connection timeout' });

module.exports = { MetricsCollector, AlertManager, Logger };

