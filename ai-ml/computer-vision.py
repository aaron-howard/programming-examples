"""
Computer Vision - Python

Processing and understanding images:
- Image filtering
- Edge detection (simplified)
- Object detection (conceptual)
"""

import math
from typing import List, Tuple, Dict
import numpy as np


# Image representation (simplified - 2D array of pixels)
class Image:
    def __init__(self, width: int, height: int, data: List[List[int]] = None):
        self.width = width
        self.height = height
        self.data = data if data else [[0] * width for _ in range(height)]
    
    def get_pixel(self, x: int, y: int) -> int:
        if x < 0 or x >= self.width or y < 0 or y >= self.height:
            return 0
        return self.data[y][x]
    
    def set_pixel(self, x: int, y: int, value: int):
        if 0 <= x < self.width and 0 <= y < self.height:
            self.data[y][x] = max(0, min(255, int(value)))


# Image Filtering
class ImageFilter:
    @staticmethod
    def gaussian_blur(image: Image, kernel_size: int = 3) -> Image:
        kernel = ImageFilter.create_gaussian_kernel(kernel_size)
        result = Image(image.width, image.height)
        
        offset = kernel_size // 2
        for y in range(image.height):
            for x in range(image.width):
                total = 0
                for ky in range(kernel_size):
                    for kx in range(kernel_size):
                        px = x + kx - offset
                        py = y + ky - offset
                        total += image.get_pixel(px, py) * kernel[ky][kx]
                result.set_pixel(x, y, total)
        return result
    
    @staticmethod
    def create_gaussian_kernel(size: int) -> List[List[float]]:
        kernel = [[0] * size for _ in range(size)]
        sigma = size / 3
        center = size // 2
        total = 0
        
        for y in range(size):
            for x in range(size):
                dx = x - center
                dy = y - center
                value = math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma))
                kernel[y][x] = value
                total += value
        
        # Normalize
        for y in range(size):
            for x in range(size):
                kernel[y][x] /= total
        
        return kernel
    
    @staticmethod
    def sobel_edge_detection(image: Image) -> Image:
        sobel_x = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]]
        sobel_y = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]]
        result = Image(image.width, image.height)
        
        for y in range(1, image.height - 1):
            for x in range(1, image.width - 1):
                gx = gy = 0
                
                for ky in range(-1, 2):
                    for kx in range(-1, 2):
                        pixel = image.get_pixel(x + kx, y + ky)
                        gx += pixel * sobel_x[ky + 1][kx + 1]
                        gy += pixel * sobel_y[ky + 1][kx + 1]
                
                magnitude = math.sqrt(gx * gx + gy * gy)
                result.set_pixel(x, y, magnitude)
        
        return result


# Object Detection (Conceptual - simplified)
class ObjectDetector:
    def __init__(self):
        self.templates: Dict = {}
    
    def detect_objects(self, image: Image, template: Image) -> List[Dict]:
        matches = []
        threshold = 0.8
        
        for y in range(image.height - template.height + 1):
            for x in range(image.width - template.width + 1):
                similarity = self.calculate_similarity(image, template, x, y)
                if similarity > threshold:
                    matches.append({'x': x, 'y': y, 'similarity': similarity})
        
        return matches
    
    def calculate_similarity(self, image: Image, template: Image, start_x: int, start_y: int) -> float:
        total = 0
        template_sum = 0
        image_sum = 0
        
        for y in range(template.height):
            for x in range(template.width):
                img_pixel = image.get_pixel(start_x + x, start_y + y)
                template_pixel = template.get_pixel(x, y)
                total += img_pixel * template_pixel
                template_sum += template_pixel * template_pixel
                image_sum += img_pixel * img_pixel
        
        denominator = math.sqrt(template_sum * image_sum)
        return total / denominator if denominator > 0 else 0


# Example usage
if __name__ == "__main__":
    print("=== Computer Vision ===\n")
    
    # Create a simple test image (gradient)
    print("Image Processing:")
    image = Image(10, 10)
    for y in range(10):
        for x in range(10):
            image.set_pixel(x, y, (x + y) * 10)
    
    print("Original image (sample):")
    for y in range(3):
        row = [str(image.get_pixel(x, y)) for x in range(3)]
        print(" ".join(row))
    
    # Apply Gaussian blur
    blurred = ImageFilter.gaussian_blur(image, 3)
    print("\nBlurred image (sample):")
    for y in range(3):
        row = [str(int(blurred.get_pixel(x, y))) for x in range(3)]
        print(" ".join(row))
    
    # Edge detection
    edges = ImageFilter.sobel_edge_detection(image)
    print("\nEdge detection (sample):")
    for y in range(1, 4):
        row = [str(int(edges.get_pixel(x, y))) for x in range(1, 4)]
        print(" ".join(row))

