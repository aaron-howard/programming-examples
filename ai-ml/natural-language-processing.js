/**
 * Natural Language Processing - JavaScript
 * 
 * Processing and understanding human language:
 * - Tokenization
 * - Sentiment Analysis
 * - Text Classification (simplified)
 */

// Tokenization
class Tokenizer {
    tokenize(text) {
        // Simple tokenization - split by whitespace and punctuation
        return text
            .toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(token => token.length > 0);
    }
    
    // N-grams
    ngrams(tokens, n) {
        const grams = [];
        for (let i = 0; i <= tokens.length - n; i++) {
            grams.push(tokens.slice(i, i + n).join(' '));
        }
        return grams;
    }
}

// Sentiment Analysis (Simple)
class SentimentAnalyzer {
    constructor() {
        this.positiveWords = new Set([
            'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic',
            'love', 'like', 'happy', 'joy', 'pleased', 'satisfied'
        ]);
        this.negativeWords = new Set([
            'bad', 'terrible', 'awful', 'horrible', 'hate', 'dislike',
            'sad', 'angry', 'disappointed', 'frustrated', 'poor'
        ]);
    }
    
    analyze(text) {
        const tokenizer = new Tokenizer();
        const tokens = tokenizer.tokenize(text);
        
        let positiveCount = 0;
        let negativeCount = 0;
        
        for (const token of tokens) {
            if (this.positiveWords.has(token)) {
                positiveCount++;
            } else if (this.negativeWords.has(token)) {
                negativeCount++;
            }
        }
        
        const total = positiveCount + negativeCount;
        if (total === 0) {
            return { sentiment: 'neutral', score: 0 };
        }
        
        const score = (positiveCount - negativeCount) / total;
        let sentiment;
        
        if (score > 0.1) {
            sentiment = 'positive';
        } else if (score < -0.1) {
            sentiment = 'negative';
        } else {
            sentiment = 'neutral';
        }
        
        return { sentiment, score, positiveCount, negativeCount };
    }
}

// Text Classification (Naive Bayes - simplified)
class TextClassifier {
    constructor() {
        this.classes = {};
        this.vocabulary = new Set();
    }
    
    train(documents, labels) {
        // Count words per class
        for (let i = 0; i < documents.length; i++) {
            const label = labels[i];
            const text = documents[i];
            const tokenizer = new Tokenizer();
            const tokens = tokenizer.tokenize(text);
            
            if (!this.classes[label]) {
                this.classes[label] = { wordCounts: {}, totalWords: 0, docCount: 0 };
            }
            
            this.classes[label].docCount++;
            
            for (const token of tokens) {
                this.vocabulary.add(token);
                this.classes[label].wordCounts[token] = 
                    (this.classes[label].wordCounts[token] || 0) + 1;
                this.classes[label].totalWords++;
            }
        }
    }
    
    classify(text) {
        const tokenizer = new Tokenizer();
        const tokens = tokenizer.tokenize(text);
        const scores = {};
        
        for (const className in this.classes) {
            const classData = this.classes[className];
            let score = Math.log(classData.docCount);
            
            for (const token of tokens) {
                const wordCount = classData.wordCounts[token] || 0;
                const probability = (wordCount + 1) / (classData.totalWords + this.vocabulary.size);
                score += Math.log(probability);
            }
            
            scores[className] = score;
        }
        
        // Return class with highest score
        return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    }
}

// Example usage
console.log('=== Natural Language Processing ===\n');

// Tokenization
console.log('Tokenization:');
const tokenizer = new Tokenizer();
const text = "Hello, world! This is a test.";
const tokens = tokenizer.tokenize(text);
console.log('Text:', text);
console.log('Tokens:', tokens);
console.log('Bigrams:', tokenizer.ngrams(tokens, 2));

// Sentiment Analysis
console.log('\nSentiment Analysis:');
const analyzer = new SentimentAnalyzer();
const reviews = [
    "This product is amazing! I love it!",
    "Terrible quality, very disappointed.",
    "It's okay, nothing special."
];

reviews.forEach(review => {
    const result = analyzer.analyze(review);
    console.log(`"${review}"`);
    console.log(`  Sentiment: ${result.sentiment}, Score: ${result.score.toFixed(2)}`);
});

// Text Classification
console.log('\nText Classification:');
const classifier = new TextClassifier();
const documents = [
    "I love this movie",
    "Great film, highly recommend",
    "Terrible acting, waste of time",
    "Boring and slow",
    "Amazing cinematography",
    "Poor storyline"
];
const labels = ['positive', 'positive', 'negative', 'negative', 'positive', 'negative'];

classifier.train(documents, labels);

const testTexts = [
    "This is a wonderful film",
    "I hate this boring movie"
];

testTexts.forEach(text => {
    const classification = classifier.classify(text);
    console.log(`"${text}" -> ${classification}`);
});

module.exports = { Tokenizer, SentimentAnalyzer, TextClassifier };

