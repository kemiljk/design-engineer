#!/usr/bin/env python3
"""
Convert bullet points in "What You'll Learn" and "Key Takeaways" sections to sentence case.
"""

import re
import sys
from pathlib import Path

def fix_bullet_case(content):
    """Convert bullet points in target sections to sentence case."""
    lines = content.split('\n')
    result = []
    i = 0
    in_target_section = False
    
    while i < len(lines):
        line = lines[i]
        
        # Check if we're entering a target section
        if re.match(r'^## (What You\'ll Learn|Key Takeaways)$', line):
            in_target_section = True
            result.append(line)
            i += 1
            continue
        
        # Check if we're leaving the section (hit another ## header)
        if in_target_section and line.startswith('##') and not line.startswith('###'):
            in_target_section = False
        
        # If we're in a target section and this is a bullet point starting with capital
        if in_target_section and re.match(r'^- [A-Z]', line):
            # Convert first letter after "- " to lowercase
            line = re.sub(r'^(- )([A-Z])', lambda m: m.group(1) + m.group(2).lower(), line, count=1)
        
        result.append(line)
        i += 1
    
    return '\n'.join(result)

def process_file(file_path):
    """Process a single markdown file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = fix_bullet_case(content)
        
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
