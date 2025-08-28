#!/usr/bin/env python3
import re

def update_titles():
    # Read the brothers.html file
    with open('brothers.html', 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace profile-title with brother-title
    updated_content = content.replace('profile-title', 'brother-title')
    
    # Write the updated content back to the file
    with open('brothers.html', 'w', encoding='utf-8') as file:
        file.write(updated_content)
    
    print("Successfully updated title classes!")

if __name__ == "__main__":
    update_titles()
