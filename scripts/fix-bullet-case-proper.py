#!/usr/bin/env python3
"""
Convert bullet points in "What You'll Learn" and "Key Takeaways" sections to proper sentence case
and remove duplicates.
"""

import re
import sys
from pathlib import Path

def to_sentence_case(text):
    """Convert text to sentence case (capitalize first letter only if it's lowercase)."""
    if not text:
        return text
    # Only capitalize first letter if it's lowercase, preserve the rest
    if text[0].islower():
        return text[0].upper() + text[1:]
    return text

def fix_bullet_case_and_remove_duplicates(content):
    """Convert bullet points in target sections to sentence case and remove duplicates."""
    lines = content.split('\n')
    result = []
    i = 0
    in_target_section = False
    seen_bullets = set()
    
    while i < len(lines):
        line = lines[i]
        
        # Check if we're entering a target section
        if re.match(r'^## (What You\'ll Learn|Key Takeaways)$', line):
            in_target_section = True
            seen_bullets = set()  # Reset for new section
            result.append(line)
            i += 1
            continue
        
        # Check if we're leaving the section (hit another ## header)
        if in_target_section and line.startswith('##') and not line.startswith('###'):
            in_target_section = False
            seen_bullets = set()
        
        # If we're in a target section and this is a bullet point
        if in_target_section and line.startswith('- '):
            # Extract the content after "- "
            bullet_content = line[2:].strip()
            
            # Check for duplicates (case-insensitive)
            bullet_lower = bullet_content.lower()
            if bullet_lower in seen_bullets:
                # Skip duplicate
                i += 1
                continue
            
            seen_bullets.add(bullet_lower)
            
            # Convert to sentence case
            if bullet_content:
                # Only convert if it starts with lowercase
                if bullet_content[0].islower():
                    bullet_content = to_sentence_case(bullet_content)
                line = f"- {bullet_content}"
        
        result.append(line)
        i += 1
    
    return '\n'.join(result)

def process_file(file_path):
    """Process a single markdown file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = fix_bullet_case_and_remove_duplicates(content)
        
        if content != new_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {file_path}: {e}", file=sys.stderr)
        return False

def main():
    content_dir = Path('content')
    md_files = list(content_dir.rglob('*.md'))
    
    changed_count = 0
    for md_file in md_files:
        if process_file(md_file):
            changed_count += 1
            print(f"Fixed: {md_file}")
    
    print(f"\nProcessed {len(md_files)} files, changed {changed_count} files")

if __name__ == '__main__':
    main()
