#!/usr/bin/env python3
"""
Script to update all image paths in HTML files to use compressed versions
"""

import re
import os
import glob

def update_image_paths_in_file(file_path):
    """Update image paths in a single HTML file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Update various image paths to use compressed versions
        replacements = [
            # Main images
            (r'src="images/([^"]+)"', r'src="images-compressed/\1"'),
            # Brother images (already done, but just in case)
            (r'src="assets/brother-images/([^"]+)"', r'src="assets/brother-images-compressed/\1"'),
            # Founder images
            (r'src="assets/founders-images/([^"]+)"', r'src="assets/founders-images-compressed/\1"'),
        ]
        
        for pattern, replacement in replacements:
            content = re.sub(pattern, replacement, content)
        
        # Only write if changes were made
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Updated {file_path}")
            return True
        else:
            print(f"- No changes needed in {file_path}")
            return False
            
    except Exception as e:
        print(f"✗ Error processing {file_path}: {e}")
        return False

def main():
    print("🔄 Updating image paths to use compressed versions")
    print("=" * 60)
    
    # Get all HTML files
    html_files = glob.glob("*.html")
    
    updated_files = 0
    total_files = len(html_files)
    
    for html_file in html_files:
        if update_image_paths_in_file(html_file):
            updated_files += 1
    
    print("=" * 60)
    print(f"✅ Updated {updated_files} out of {total_files} HTML files")
    print("\n📝 Next steps:")
    print("1. Test the website to ensure all images load correctly")
    print("2. Check that all pages display properly")
    print("3. Verify that the compressed images look good")

if __name__ == "__main__":
    main()
