#!/usr/bin/env python3
"""
Refine long bullets (>100 chars) into shorter, more concise bullets.
"""

import re
from pathlib import Path
from typing import List, Tuple

CONTENT_DIR = Path("content/course")
MAX_BULLET_LENGTH = 100


def split_long_bullet(bullet: str) -> List[str]:
    """Split a long bullet into shorter bullets."""
    bullet = bullet.strip()
    if not bullet.startswith('- '):
        return [bullet]
    
    content = bullet[2:].strip()  # Remove '- '
    
    # If it's already short enough, return as-is
    if len(content) <= MAX_BULLET_LENGTH:
        return [bullet]
    
    # Try to split on common patterns
    # Pattern 1: Split on ", and" or ", whilst" etc.
    parts = re.split(r',\s+(and|whilst|while|also|additionally|furthermore|moreover)\s+', content, flags=re.IGNORECASE)
    if len(parts) > 1:
        bullets = []
        i = 0
        current = ""
        while i < len(parts):
            if i % 2 == 0:  # Text part
                if current:
                    if len(current.strip()) > 30:
                        bullets.append(current.strip())
                    current = parts[i]
                else:
                    current = parts[i]
            else:  # Conjunction part
                # If current + conjunction + next part is reasonable, combine
                if i + 1 < len(parts):
                    potential = current + ", " + parts[i] + " " + parts[i+1]
                    if len(potential) <= MAX_BULLET_LENGTH:
                        current = potential
                        i += 1  # Skip next part since we combined it
                    else:
                        if len(current.strip()) > 20:
                            bullets.append(current.strip())
                        current = parts[i+1] if i+1 < len(parts) else ""
                else:
                    current += ", " + parts[i]
            i += 1
        if current.strip():
            bullets.append(current.strip())
        
        if len(bullets) > 1:
            return [f"- {b}" for b in bullets if 15 <= len(b) <= MAX_BULLET_LENGTH]
    
    # Pattern 2: Split on semicolons
    if ';' in content:
        parts = [p.strip() for p in content.split(';') if p.strip()]
        if len(parts) > 1:
            bullets = [f"- {p}" for p in parts if 15 <= len(p) <= MAX_BULLET_LENGTH]
            if len(bullets) > 1:
                return bullets
    
    # Pattern 3: Split on "and" or "whilst" in the middle
    if re.search(r'\s+(and|whilst|while|also)\s+', content, re.IGNORECASE):
        parts = re.split(r'\s+(and|whilst|while|also)\s+', content, flags=re.IGNORECASE)
        if len(parts) >= 3:  # At least one split
            bullets = []
            i = 0
            current = ""
            while i < len(parts):
                if i % 2 == 0:  # Text
                    if current:
                        combined = current + " " + parts[i]
                        if len(combined) <= MAX_BULLET_LENGTH:
                            current = combined
                        else:
                            if len(current.strip()) > 20:
                                bullets.append(current.strip())
                            current = parts[i]
                    else:
                        current = parts[i]
                else:  # Conjunction
                    # Try combining with next
                    if i + 1 < len(parts):
                        potential = current + " " + parts[i] + " " + parts[i+1]
                        if len(potential) <= MAX_BULLET_LENGTH:
                            current = potential
                            i += 1
                        else:
                            if len(current.strip()) > 20:
                                bullets.append(current.strip())
                            current = parts[i+1] if i+1 < len(parts) else ""
                    else:
                        current += " " + parts[i]
                i += 1
            if current.strip():
                bullets.append(current.strip())
            
            if len(bullets) > 1:
                return [f"- {b}" for b in bullets if 15 <= len(b) <= MAX_BULLET_LENGTH]
    
    # Pattern 4: If still too long, try to truncate intelligently
    if len(content) > MAX_BULLET_LENGTH:
        # Try to find a good break point
        # Look for the last comma or period before MAX_BULLET_LENGTH
        truncate_at = MAX_BULLET_LENGTH - 20
        for i in range(truncate_at, max(0, truncate_at - 50), -1):
            if content[i] in ',.':
                return [f"- {content[:i+1].strip()}"]
        
        # Fallback: just truncate
        return [f"- {content[:MAX_BULLET_LENGTH-3].strip()}..."]
    
    return [bullet]


def refine_section(content: str, section_name: str) -> Tuple[str, bool]:
    """Refine a section by splitting long bullets."""
    pattern = rf'^## {re.escape(section_name)}$'
    lines = content.split('\n')
    
    modified = False
    new_lines = []
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        if re.match(pattern, line):
            new_lines.append(line)
            i += 1
            
            # Skip blank line after heading
            if i < len(lines) and not lines[i].strip():
                new_lines.append(lines[i])
                i += 1
            
            # Process bullets until next section
            while i < len(lines) and not lines[i].startswith('##'):
                bullet_line = lines[i]
                
                if bullet_line.strip().startswith('- '):
                    # Check if bullet is too long
                    if len(bullet_line.strip()) > MAX_BULLET_LENGTH + 2:  # +2 for '- '
                        # Split the bullet
                        split_bullets = split_long_bullet(bullet_line.strip())
                        for bullet in split_bullets:
                            new_lines.append(bullet)
                        if len(split_bullets) > 1:
                            modified = True
                    else:
                        new_lines.append(bullet_line)
                else:
                    new_lines.append(bullet_line)
                
                i += 1
        else:
            new_lines.append(line)
            i += 1
    
    return '\n'.join(new_lines), modified


def process_file(file_path: Path) -> bool:
    """Process a file and return True if modified."""
    try:
        content = file_path.read_text(encoding='utf-8')
        original = content
        
        # Refine both sections
        content, modified1 = refine_section(content, "What You'll Learn")
        content, modified2 = refine_section(content, "Key Takeaways")
        
        if (modified1 or modified2) and content != original:
            file_path.write_text(content, encoding='utf-8')
            return True
        
        return False
    
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False


def main():
    """Main function."""
    files = list(CONTENT_DIR.rglob("*.md"))
    files = [f for f in files if "_meta" not in str(f) and f.name != "index.md"]
    
    print(f"Found {len(files)} files to process")
    
    modified_count = 0
    for file_path in sorted(files):
        if process_file(file_path):
            modified_count += 1
            print(f"Refined: {file_path}")
    
    print(f"\nProcessed {len(files)} files, refined {modified_count} files")


if __name__ == "__main__":
    main()
