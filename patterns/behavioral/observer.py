"""
Observer Pattern - Python

Defines a one-to-many dependency between objects so that when one object
changes state, all its dependents are notified and updated automatically.

Use cases:
- Event handling systems
- Model-View architectures
- Real-time data updates
- Pub/Sub systems
"""

from abc import ABC, abstractmethod


# Subject (Observable)
class Subject:
    def __init__(self):
        self.observers = []
    
    def attach(self, observer):
        if observer not in self.observers:
            self.observers.append(observer)
    
    def detach(self, observer):
        if observer in self.observers:
            self.observers.remove(observer)
    
    def notify(self, data):
        for observer in self.observers:
            observer.update(data)


# Observer interface
class Observer(ABC):
    @abstractmethod
    def update(self, data):
        pass


# Concrete observers
class EmailObserver(Observer):
    def __init__(self, email):
        self.email = email
    
    def update(self, data):
        print(f"Email to {self.email}: {data}")


class SMSObserver(Observer):
    def __init__(self, phone):
        self.phone = phone
    
    def update(self, data):
        print(f"SMS to {self.phone}: {data}")


class PushObserver(Observer):
    def __init__(self, device_id):
        self.device_id = device_id
    
    def update(self, data):
        print(f"Push notification to device {self.device_id}: {data}")


# Concrete subject
class NewsAgency(Subject):
    def __init__(self, name):
        super().__init__()
        self.name = name
        self.news = None
    
    def set_news(self, news):
        self.news = news
        self.notify(news)


# Example usage
if __name__ == "__main__":
    print("=== Observer Pattern ===\n")
    
    news_agency = NewsAgency('Tech News')
    
    email_observer = EmailObserver('user@example.com')
    sms_observer = SMSObserver('+1234567890')
    push_observer = PushObserver('device-123')
    
    news_agency.attach(email_observer)
    news_agency.attach(sms_observer)
    news_agency.attach(push_observer)
    
    print("Breaking news:")
    news_agency.set_news('New Python framework released!')
    
    print("\nRemoving SMS observer:")
    news_agency.detach(sms_observer)
    
    print("\nAnother news update:")
    news_agency.set_news('AI breakthrough announced!')

