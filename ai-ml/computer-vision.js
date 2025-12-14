/**
 * Computer Vision - JavaScript
 * 
 * Processing and understanding images:
 * - Image filtering
 * - Edge detection (simplified)
 * - Object detection (conceptual)
 */

// Image representation (simplified - 2D array of pixels)
class Image {
    constructor(width, height, data = null) {
        this.width = width;
        this.height = height;
        this.data = data || Array(height).fill(0).map(() => Array(width).fill(0));
    }
    
    getPixel(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return 0;
        }
        return this.data[y][x];
    }
    
    setPixel(x, y, value) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            this.data[y][x] = Math.max(0, Math.min(255, value));
        }
    }
}

// Image Filtering
class ImageFilter {
    // Gaussian blur (simplified)
    static gaussianBlur(image, kernelSize = 3) {
        const kernel = this.createGaussianKernel(kernelSize);
        const result = new Image(image.width, image.height);
        
        const offset = Math.floor(kernelSize / 2);
        for (let y = 0; y < image.height; y++) {
            for (let x = 0; x < image.width; x++) {
                let sum = 0;
                for (let ky = 0; ky < kernelSize; ky++) {
                    for (let kx = 0; kx < kernelSize; kx++) {
                        const px = x + kx - offset;
                        const py = y + ky - offset;
                        sum += image.getPixel(px, py) * kernel[ky][kx];
                    }
                }
                result.setPixel(x, y, sum);
            }
        }
        return result;
    }
    
    static createGaussianKernel(size) {
        const kernel = Array(size).fill(0).map(() => Array(size).fill(0));
        const sigma = size / 3;
        const center = Math.floor(size / 2);
        let sum = 0;
        
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const dx = x - center;
                const dy = y - center;
                const value = Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
                kernel[y][x] = value;
                sum += value;
            }
        }
        
        // Normalize
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                kernel[y][x] /= sum;
            }
        }
        
        return kernel;
    }
    
    // Edge detection (Sobel operator - simplified)
    static sobelEdgeDetection(image) {
        const sobelX = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
        const sobelY = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];
        const result = new Image(image.width, image.height);
        
        for (let y = 1; y < image.height - 1; y++) {
            for (let x = 1; x < image.width - 1; x++) {
                let gx = 0, gy = 0;
                
                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {
                        const pixel = image.getPixel(x + kx, y + ky);
                        gx += pixel * sobelX[ky + 1][kx + 1];
                        gy += pixel * sobelY[ky + 1][kx + 1];
                    }
                }
                
                const magnitude = Math.sqrt(gx * gx + gy * gy);
                result.setPixel(x, y, magnitude);
            }
        }
        
        return result;
    }
}

// Object Detection (Conceptual - simplified)
class ObjectDetector {
    constructor() {
        this.templates = {}; // Stored templates/features
    }
    
    // Template matching (simplified)
    detectObjects(image, template) {
        const matches = [];
        const threshold = 0.8;
        
        for (let y = 0; y <= image.height - template.height; y++) {
            for (let x = 0; x <= image.width - template.width; x++) {
                const similarity = this.calculateSimilarity(image, template, x, y);
                if (similarity > threshold) {
                    matches.push({ x, y, similarity });
                }
            }
        }
        
        return matches;
    }
    
    calculateSimilarity(image, template, startX, startY) {
        let sum = 0;
        let templateSum = 0;
        let imageSum = 0;
        
        for (let y = 0; y < template.height; y++) {
            for (let x = 0; x < template.width; x++) {
                const imgPixel = image.getPixel(startX + x, startY + y);
                const templatePixel = template.getPixel(x, y);
                sum += imgPixel * templatePixel;
                templateSum += templatePixel * templatePixel;
                imageSum += imgPixel * imgPixel;
            }
        }
        
        const denominator = Math.sqrt(templateSum * imageSum);
        return denominator > 0 ? sum / denominator : 0;
    }
}

// Example usage
console.log('=== Computer Vision ===\n');

// Create a simple test image (gradient)
console.log('Image Processing:');
const image = new Image(10, 10);
for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
        image.setPixel(x, y, (x + y) * 10);
    }
}

console.log('Original image (sample):');
for (let y = 0; y < 3; y++) {
    const row = [];
    for (let x = 0; x < 3; x++) {
        row.push(image.getPixel(x, y));
    }
    console.log(row.join(' '));
}

// Apply Gaussian blur
const blurred = ImageFilter.gaussianBlur(image, 3);
console.log('\nBlurred image (sample):');
for (let y = 0; y < 3; y++) {
    const row = [];
    for (let x = 0; x < 3; x++) {
        row.push(Math.round(blurred.getPixel(x, y)));
    }
    console.log(row.join(' '));
}

// Edge detection
const edges = ImageFilter.sobelEdgeDetection(image);
console.log('\nEdge detection (sample):');
for (let y = 1; y < 4; y++) {
    const row = [];
    for (let x = 1; x < 4; x++) {
        row.push(Math.round(edges.getPixel(x, y)));
    }
    console.log(row.join(' '));
}

module.exports = { Image, ImageFilter, ObjectDetector };

