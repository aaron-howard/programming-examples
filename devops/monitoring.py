"""
Monitoring - Python

System and application monitoring:
- Metrics collection
- Alerting
- Logging
"""

from typing import Dict, List, Optional
from datetime import datetime
from dataclasses import dataclass
from enum import Enum


class LogLevel(Enum):
    DEBUG = 0
    INFO = 1
    WARN = 2
    ERROR = 3


# Metrics Collector
class MetricsCollector:
    def __init__(self):
        self.metrics: Dict[str, List[Dict]] = {}
        self.history: List[Dict] = []
    
    def record(self, metric_name: str, value: float, tags: Dict = None):
        if tags is None:
            tags = {}
        timestamp = datetime.now().timestamp() * 1000
        
        metric = {
            'name': metric_name,
            'value': value,
            'tags': tags,
            'timestamp': timestamp
        }
        
        if metric_name not in self.metrics:
            self.metrics[metric_name] = []
        
        self.metrics[metric_name].append(metric)
        self.history.append(metric)
        
        return metric
    
    def get_metric(self, metric_name: str, time_range: Optional[int] = None) -> List[Dict]:
        metrics = self.metrics.get(metric_name, [])
        
        if time_range:
            cutoff = datetime.now().timestamp() * 1000 - time_range
            return [m for m in metrics if m['timestamp'] >= cutoff]
        
        return metrics
    
    def get_average(self, metric_name: str, time_range: Optional[int] = None) -> float:
        metrics = self.get_metric(metric_name, time_range)
        if not metrics:
            return 0.0
        
        total = sum(m['value'] for m in metrics)
        return total / len(metrics)


# Alert Manager
class AlertManager:
    def __init__(self):
        self.rules: List[Dict] = []
        self.triggered_alerts: List[Dict] = []
    
    def add_rule(self, rule: Dict):
        self.rules.append(rule)
    
    def check(self, metrics_collector: MetricsCollector):
        for rule in self.rules:
            value = metrics_collector.get_average(rule['metric'], rule.get('time_range'))
            
            if self.evaluate_rule(rule, value):
                self.trigger_alert(rule, value)
    
    def evaluate_rule(self, rule: Dict, value: float) -> bool:
        operator = rule['operator']
        threshold = rule['threshold']
        
        if operator == '>':
            return value > threshold
        elif operator == '<':
            return value < threshold
        elif operator == '>=':
            return value >= threshold
        elif operator == '<=':
            return value <= threshold
        return False
    
    def trigger_alert(self, rule: Dict, value: float):
        alert = {
            'rule': rule['name'],
            'metric': rule['metric'],
            'value': value,
            'threshold': rule['threshold'],
            'severity': rule.get('severity', 'warning'),
            'timestamp': datetime.now().timestamp() * 1000
        }
        
        self.triggered_alerts.append(alert)
        print(f"🚨 ALERT: {rule['name']} - {rule['metric']} = {value:.2f} (threshold: {rule['threshold']})")
    
    def get_alerts(self) -> List[Dict]:
        return self.triggered_alerts


# Logger
class Logger:
    def __init__(self, level: str = 'info'):
        self.level = LogLevel[level.upper()]
        self.logs: List[Dict] = []
    
    def log(self, level: str, message: str, metadata: Dict = None):
        if metadata is None:
            metadata = {}
        log_level = LogLevel[level.upper()]
        
        if log_level.value >= self.level.value:
            log_entry = {
                'level': level,
                'message': message,
                'metadata': metadata,
                'timestamp': datetime.now().isoformat()
            }
            
            self.logs.append(log_entry)
            print(f"[{level.upper()}] {message}", metadata)
    
    def debug(self, message: str, metadata: Dict = None):
        self.log('debug', message, metadata)
    
    def info(self, message: str, metadata: Dict = None):
        self.log('info', message, metadata)
    
    def warn(self, message: str, metadata: Dict = None):
        self.log('warn', message, metadata)
    
    def error(self, message: str, metadata: Dict = None):
        self.log('error', message, metadata)
    
    def get_logs(self, level: Optional[str] = None) -> List[Dict]:
        if level:
            return [log for log in self.logs if log['level'] == level]
        return self.logs


# Example usage
if __name__ == "__main__":
    print("=== Monitoring ===\n")
    
    # Metrics
    metrics = MetricsCollector()
    metrics.record('cpu_usage', 45)
    metrics.record('cpu_usage', 50)
    metrics.record('cpu_usage', 55)
    metrics.record('memory_usage', 70)
    metrics.record('memory_usage', 75)
    
    print("Metrics:")
    print(f"CPU Usage Average: {metrics.get_average('cpu_usage'):.2f}%")
    print(f"Memory Usage Average: {metrics.get_average('memory_usage'):.2f}%")
    
    # Alerts
    alerts = AlertManager()
    alerts.add_rule({
        'name': 'High CPU',
        'metric': 'cpu_usage',
        'operator': '>',
        'threshold': 50,
        'severity': 'warning',
        'time_range': 60000
    })
    
    alerts.add_rule({
        'name': 'High Memory',
        'metric': 'memory_usage',
        'operator': '>',
        'threshold': 70,
        'severity': 'critical',
        'time_range': 60000
    })
    
    print("\nChecking alerts...")
    alerts.check(metrics)
    
    # Logging
    print("\nLogging:")
    logger = Logger('info')
    logger.info('Application started', {'port': 3000})
    logger.warn('High memory usage detected', {'usage': 75})
    logger.error('Database connection failed', {'error': 'Connection timeout'})

