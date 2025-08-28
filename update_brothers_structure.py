#!/usr/bin/env python3
import re

def update_brothers_html():
    # Read the brothers.html file
    with open('brothers.html', 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Pattern to match profile-card structure with title
    pattern_with_title = r'''          <!-- ([^-]+) -->
          <div class="profile-card">
            <div class="profile-image-container">
              <img
                src="([^"]+)"
                alt="([^"]+)"
                class="profile-image"
              />
              <div class="linkedin-overlay">
                <a
                  href="[^"]+"
                  class="linkedin-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="[^"]+"
                    alt="LinkedIn"
                    class="linkedin-icon"
                  />
                  <span>View Profile</span>
                </a>
              </div>
            </div>
            <div class="profile-info">
              <div class="profile-name">([^<]+)</div>
              <div class="profile-title">([^<]+)</div>
            </div>
          </div>'''
    
    # Replacement template with title
    replacement_with_title = r'''          <!-- \1 -->
          <div class="brother-item">
            <img
              src="\2"
              alt="\3"
              class="brother-image"
            />
            <div class="brother-name">\4</div>
            <div class="brother-title">\5</div>
          </div>'''
    
    # Pattern to match profile-card structure without title
    pattern_without_title = r'''          <!-- ([^-]+) -->
          <div class="profile-card">
            <div class="profile-image-container">
              <img
                src="([^"]+)"
                alt="([^"]+)"
                class="profile-image"
              />
              <div class="linkedin-overlay">
                <a
                  href="[^"]+"
                  class="linkedin-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="[^"]+"
                    alt="LinkedIn"
                    class="linkedin-icon"
                  />
                  <span>View Profile</span>
                </a>
              </div>
            </div>
            <div class="profile-info">
              <div class="profile-name">([^<]+)</div>
            </div>
          </div>'''
    
    # Replacement template without title
    replacement_without_title = r'''          <!-- \1 -->
          <div class="brother-item">
            <img
              src="\2"
              alt="\3"
              class="brother-image"
            />
            <div class="brother-name">\4</div>
          </div>'''
    
    # Apply the replacements
    updated_content = re.sub(pattern_with_title, replacement_with_title, content, flags=re.MULTILINE | re.DOTALL)
    updated_content = re.sub(pattern_without_title, replacement_without_title, updated_content, flags=re.MULTILINE | re.DOTALL)
    
    # Also replace any remaining profile-title with brother-title
    updated_content = updated_content.replace('profile-title', 'brother-title')
    updated_content = updated_content.replace('profile-name', 'brother-name')
    
    # Write the updated content back to the file
    with open('brothers.html', 'w', encoding='utf-8') as file:
        file.write(updated_content)
    
    print("Successfully updated brothers.html structure!")

if __name__ == "__main__":
    update_brothers_html()
