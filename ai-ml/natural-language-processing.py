"""
Natural Language Processing - Python

Processing and understanding human language:
- Tokenization
- Sentiment Analysis
- Text Classification (simplified)
"""

import re
import math
from typing import List, Dict, Set, Tuple
from collections import Counter


# Tokenization
class Tokenizer:
    def tokenize(self, text: str) -> List[str]:
        # Simple tokenization - split by whitespace and punctuation
        text_lower = text.lower()
        text_clean = re.sub(r'[^\w\s]', ' ', text_lower)
        tokens = text_clean.split()
        return [token for token in tokens if token]
    
    def ngrams(self, tokens: List[str], n: int) -> List[str]:
        grams = []
        for i in range(len(tokens) - n + 1):
            grams.append(' '.join(tokens[i:i + n]))
        return grams


# Sentiment Analysis (Simple)
class SentimentAnalyzer:
    def __init__(self):
        self.positive_words = {
            'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic',
            'love', 'like', 'happy', 'joy', 'pleased', 'satisfied'
        }
        self.negative_words = {
            'bad', 'terrible', 'awful', 'horrible', 'hate', 'dislike',
            'sad', 'angry', 'disappointed', 'frustrated', 'poor'
        }
    
    def analyze(self, text: str) -> Dict:
        tokenizer = Tokenizer()
        tokens = tokenizer.tokenize(text)
        
        positive_count = sum(1 for token in tokens if token in self.positive_words)
        negative_count = sum(1 for token in tokens if token in self.negative_words)
        
        total = positive_count + negative_count
        if total == 0:
            return {'sentiment': 'neutral', 'score': 0}
        
        score = (positive_count - negative_count) / total
        
        if score > 0.1:
            sentiment = 'positive'
        elif score < -0.1:
            sentiment = 'negative'
        else:
            sentiment = 'neutral'
        
        return {
            'sentiment': sentiment,
            'score': score,
            'positive_count': positive_count,
            'negative_count': negative_count
        }


# Text Classification (Naive Bayes - simplified)
class TextClassifier:
    def __init__(self):
        self.classes: Dict[str, Dict] = {}
        self.vocabulary: Set[str] = set()
    
    def train(self, documents: List[str], labels: List[str]):
        # Count words per class
        for doc, label in zip(documents, labels):
            tokenizer = Tokenizer()
            tokens = tokenizer.tokenize(doc)
            
            if label not in self.classes:
                self.classes[label] = {'word_counts': Counter(), 'total_words': 0, 'doc_count': 0}
            
            self.classes[label]['doc_count'] += 1
            
            for token in tokens:
                self.vocabulary.add(token)
                self.classes[label]['word_counts'][token] += 1
                self.classes[label]['total_words'] += 1
    
    def classify(self, text: str) -> str:
        tokenizer = Tokenizer()
        tokens = tokenizer.tokenize(text)
        scores = {}
        
        for class_name, class_data in self.classes.items():
            score = math.log(class_data['doc_count'])
            
            for token in tokens:
                word_count = class_data['word_counts'].get(token, 0)
                probability = (word_count + 1) / (class_data['total_words'] + len(self.vocabulary))
                score += math.log(probability)
            
            scores[class_name] = score
        
        # Return class with highest score
        return max(scores, key=scores.get)


# Example usage
if __name__ == "__main__":
    print("=== Natural Language Processing ===\n")
    
    # Tokenization
    print("Tokenization:")
    tokenizer = Tokenizer()
    text = "Hello, world! This is a test."
    tokens = tokenizer.tokenize(text)
    print("Text:", text)
    print("Tokens:", tokens)
    print("Bigrams:", tokenizer.ngrams(tokens, 2))
    
    # Sentiment Analysis
    print("\nSentiment Analysis:")
    analyzer = SentimentAnalyzer()
    reviews = [
        "This product is amazing! I love it!",
        "Terrible quality, very disappointed.",
        "It's okay, nothing special."
    ]
    
    for review in reviews:
        result = analyzer.analyze(review)
        print(f'"{review}"')
        print(f"  Sentiment: {result['sentiment']}, Score: {result['score']:.2f}")
    
    # Text Classification
    print("\nText Classification:")
    classifier = TextClassifier()
    documents = [
        "I love this movie",
        "Great film, highly recommend",
        "Terrible acting, waste of time",
        "Boring and slow",
        "Amazing cinematography",
        "Poor storyline"
    ]
    labels = ['positive', 'positive', 'negative', 'negative', 'positive', 'negative']
    
    classifier.train(documents, labels)
    
    test_texts = [
        "This is a wonderful film",
        "I hate this boring movie"
    ]
    
    for text in test_texts:
        classification = classifier.classify(text)
        print(f'"{text}" -> {classification}')

